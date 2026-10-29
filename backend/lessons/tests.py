from django.test import TestCase

from .models import Lesson


class LessonListTests(TestCase):
    def setUp(self):
        Lesson.objects.create(
            title="Lesson Two",
            slug="lesson-two",
            description="Second lesson",
            content="Lesson two content",
            order=2,
            is_published=True,
        )
        Lesson.objects.create(
            title="Lesson One",
            slug="lesson-one",
            description="First lesson",
            content="Lesson one content",
            order=1,
            is_published=True,
        )
        Lesson.objects.create(
            title="Draft lesson",
            slug="draft-lesson",
            description="Not published",
            content="Draft content",
            order=0,
            is_published=False,
        )

    def test_returns_published_lessons_in_order(self):
        response = self.client.get("/api/lessons/")

        self.assertEqual(response.status_code, 200)
        lessons = response.json()["lessons"]
        self.assertEqual([lesson["slug"] for lesson in lessons], ["lesson-one", "lesson-two"])
        self.assertEqual(lessons[0]["content"], "Lesson one content")

    def test_does_not_return_unpublished_lessons(self):
        response = self.client.get("/api/lessons/")

        slugs = [lesson["slug"] for lesson in response.json()["lessons"]]
        self.assertNotIn("draft-lesson", slugs)

    def test_rejects_non_get_requests(self):
        response = self.client.post("/api/lessons/")

        self.assertEqual(response.status_code, 405)

    def test_homepage_serves_frontend_with_django_static_paths(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'href="/static/style.css"')
        self.assertContains(response, 'src="/static/script.js"')
        self.assertContains(response, 'id="lessonLibrary"')
