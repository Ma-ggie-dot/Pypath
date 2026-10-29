from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/lessons/", include("lessons.urls")),
    path("", include("core.urls")),
]
