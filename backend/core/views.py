import json
import logging
import os
from http.client import HTTPException
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from django.core.cache import cache
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST


logger = logging.getLogger(__name__)
MAX_QUESTION_LENGTH = 1200
MAX_PROVIDER_RESPONSE_BYTES = 64 * 1024


@require_GET
def health_check(request):
    return JsonResponse({"status": "ok", "message": "PyPath backend is running."})


def _assistant_configuration():
    endpoint = os.environ.get("PYPATH_AI_ENDPOINT", "").strip()
    api_key = os.environ.get("PYPATH_AI_API_KEY", "").strip()
    model = os.environ.get("PYPATH_AI_MODEL", "").strip()
    parsed_endpoint = urlparse(endpoint)
    endpoint_is_secure = parsed_endpoint.scheme == "https" or (
        parsed_endpoint.scheme == "http"
        and parsed_endpoint.hostname in {"localhost", "127.0.0.1", "::1"}
    )
    configured = bool(
        endpoint
        and api_key
        and model
        and endpoint_is_secure
        and parsed_endpoint.netloc
        and parsed_endpoint.username is None
        and parsed_endpoint.password is None
    )
    return configured, endpoint, api_key, model


@require_GET
def assistant_status(request):
    configured, _, _, _ = _assistant_configuration()
    return JsonResponse({"configured": configured})


def _assistant_rate_limit_exceeded(request):
    client_ip = request.META.get("REMOTE_ADDR", "unknown")
    cache_key = f"pypath-ai:{client_ip}"
    if cache.add(cache_key, 1, timeout=60):
        return False

    try:
        request_count = cache.incr(cache_key)
    except ValueError:
        cache.set(cache_key, 2, timeout=60)
        request_count = 2
    return request_count > 5


@require_POST
def ask_assistant(request):
    configured, endpoint, api_key, model = _assistant_configuration()
    if not configured:
        return JsonResponse(
            {"error": "The AI assistant is not configured. Set a secure provider endpoint, model, and API key on the server."},
            status=503,
        )

    content_length = request.META.get("CONTENT_LENGTH")
    if content_length and content_length.isdigit() and int(content_length) > 4096:
        return JsonResponse({"error": "The request is too large."}, status=413)

    try:
        payload = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Send a valid JSON request."}, status=400)

    if not isinstance(payload, dict):
        return JsonResponse({"error": "Send a JSON object with a question."}, status=400)

    question = payload.get("question")
    if not isinstance(question, str) or not question.strip():
        return JsonResponse({"error": "Enter a Python question."}, status=400)
    if len(question) > MAX_QUESTION_LENGTH:
        return JsonResponse(
            {"error": f"Keep questions to {MAX_QUESTION_LENGTH} characters or fewer."},
            status=400,
        )

    if _assistant_rate_limit_exceeded(request):
        return JsonResponse(
            {"error": "Too many questions. Wait a minute before asking again."},
            status=429,
        )

    provider_payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are PyPath, a beginner-friendly Python tutor. Explain "
                    "programming concepts in simple English, use short Python "
                    "examples when helpful, and guide learners with hints rather "
                    "than completing whole assignments. Do not execute code."
                ),
            },
            {"role": "user", "content": question.strip()},
        ],
    }
    provider_request = Request(
        endpoint,
        data=json.dumps(provider_payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urlopen(provider_request, timeout=20) as provider_response:
            response_body = provider_response.read(MAX_PROVIDER_RESPONSE_BYTES + 1)
        if len(response_body) > MAX_PROVIDER_RESPONSE_BYTES:
            logger.warning("AI provider response exceeded the size limit.")
            return JsonResponse({"error": "The AI provider returned a response that was too large."}, status=502)
        provider_data = json.loads(response_body)
        answer = provider_data["choices"][0]["message"]["content"]
        if not isinstance(answer, str) or not answer.strip():
            raise ValueError("The provider returned no explanation.")
    except HTTPError as error:
        error.close()
        logger.warning("AI provider returned HTTP %s.", error.code)
        return JsonResponse({"error": "The AI provider could not answer right now."}, status=502)
    except (URLError, TimeoutError, OSError, HTTPException):
        logger.exception("Could not reach the configured AI provider.")
        return JsonResponse({"error": "Could not reach the AI provider. Check its server configuration and try again."}, status=502)
    except (json.JSONDecodeError, UnicodeDecodeError, KeyError, IndexError, TypeError, ValueError):
        logger.exception("The configured AI provider returned an invalid response.")
        return JsonResponse({"error": "The AI provider returned an invalid explanation. Try again later."}, status=502)

    return JsonResponse({"answer": answer.strip()})
