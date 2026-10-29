from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import Lesson


@require_GET
def lesson_list(request):
    lessons = Lesson.objects.filter(is_published=True)
    data = [
        {
            "title": lesson.title,
            "slug": lesson.slug,
            "description": lesson.description,
            "content": lesson.content,
            "order": lesson.order,
        }
        for lesson in lessons
    ]
    return JsonResponse({"lessons": data})
