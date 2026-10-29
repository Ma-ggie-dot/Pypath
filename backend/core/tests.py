import json
import os
from unittest.mock import MagicMock, patch

from django.core.cache import cache
from django.test import Client, TestCase


class HealthCheckTests(TestCase):
    def test_health_check_returns_ok_status(self):
        response = self.client.get("/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


class AssistantApiTests(TestCase):
    def setUp(self):
        cache.clear()

    def tearDown(self):
        cache.clear()

    def test_assistant_status_does_not_expose_provider_secrets(self):
        with patch.dict(os.environ, {}, clear=True):
            response = self.client.get("/api/assistant/status/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"configured": False})

    def test_assistant_rejects_non_https_remote_provider(self):
        with patch.dict(
            os.environ,
            {
                "PYPATH_AI_ENDPOINT": "http://ai.example.test/v1/chat/completions",
                "PYPATH_AI_API_KEY": "test-secret",
                "PYPATH_AI_MODEL": "test-model",
            },
            clear=True,
        ):
            response = self.client.get("/api/assistant/status/")

        self.assertEqual(response.json(), {"configured": False})

    def test_unconfigured_assistant_returns_clear_error(self):
        with patch.dict(os.environ, {}, clear=True):
            response = self.client.post(
                "/api/assistant/",
                data=json.dumps({"question": "What is a variable?"}),
                content_type="application/json",
            )

        self.assertEqual(response.status_code, 503)
        self.assertIn("not configured", response.json()["error"])

    def test_rejects_empty_and_overlong_questions(self):
        with patch.dict(
            os.environ,
            {
                "PYPATH_AI_ENDPOINT": "https://ai.example.test/v1/chat/completions",
                "PYPATH_AI_API_KEY": "test-secret",
                "PYPATH_AI_MODEL": "test-model",
            },
            clear=True,
        ):
            empty_response = self.client.post(
                "/api/assistant/",
                data=json.dumps({"question": "  "}),
                content_type="application/json",
            )
            long_response = self.client.post(
                "/api/assistant/",
                data=json.dumps({"question": "x" * 1201}),
                content_type="application/json",
            )

        self.assertEqual(empty_response.status_code, 400)
        self.assertEqual(long_response.status_code, 400)

    def test_proxies_questions_without_returning_the_provider_key(self):
        provider_response = MagicMock()
        provider_response.__enter__.return_value.read.return_value = json.dumps(
            {"choices": [{"message": {"content": "A variable is a named value."}}]}
        ).encode("utf-8")
        with (
            patch.dict(
                os.environ,
                {
                    "PYPATH_AI_ENDPOINT": "https://ai.example.test/v1/chat/completions",
                    "PYPATH_AI_API_KEY": "test-secret",
                    "PYPATH_AI_MODEL": "test-model",
                },
                clear=True,
            ),
            patch("core.views.urlopen", return_value=provider_response) as mocked_urlopen,
        ):
            response = self.client.post(
                "/api/assistant/",
                data=json.dumps({"question": "What is a variable?"}),
                content_type="application/json",
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"answer": "A variable is a named value."})
        provider_request = mocked_urlopen.call_args.args[0]
        self.assertEqual(provider_request.get_header("Authorization"), "Bearer test-secret")
        self.assertNotIn("test-secret", response.content.decode("utf-8"))

    def test_assistant_post_requires_csrf_token(self):
        client = Client(enforce_csrf_checks=True)
        with patch.dict(
            os.environ,
            {
                "PYPATH_AI_ENDPOINT": "https://ai.example.test/v1/chat/completions",
                "PYPATH_AI_API_KEY": "test-secret",
                "PYPATH_AI_MODEL": "test-model",
            },
            clear=True,
        ):
            response = client.post(
                "/api/assistant/",
                data=json.dumps({"question": "What is a variable?"}),
                content_type="application/json",
            )

        self.assertEqual(response.status_code, 403)

    def test_limits_assistant_to_five_requests_per_minute(self):
        provider_response = MagicMock()
        provider_response.__enter__.return_value.read.return_value = json.dumps(
            {"choices": [{"message": {"content": "A variable is a named value."}}]}
        ).encode("utf-8")
        with (
            patch.dict(
                os.environ,
                {
                    "PYPATH_AI_ENDPOINT": "https://ai.example.test/v1/chat/completions",
                    "PYPATH_AI_API_KEY": "test-secret",
                    "PYPATH_AI_MODEL": "test-model",
                },
                clear=True,
            ),
            patch("core.views.urlopen", return_value=provider_response) as mocked_urlopen,
        ):
            responses = [
                self.client.post(
                    "/api/assistant/",
                    data=json.dumps({"question": "What is a variable?"}),
                    content_type="application/json",
                )
                for _ in range(6)
            ]

        self.assertEqual([response.status_code for response in responses], [200, 200, 200, 200, 200, 429])
        self.assertEqual(mocked_urlopen.call_count, 5)
