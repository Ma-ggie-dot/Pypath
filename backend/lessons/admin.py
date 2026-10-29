from django.contrib import admin

from .models import Lesson


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}