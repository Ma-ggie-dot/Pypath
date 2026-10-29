from django.urls import path

from . import views


urlpatterns = [
    path("health/", views.health_check, name="health_check"),
    path("api/assistant/status/", views.assistant_status, name="assistant_status"),
    path("api/assistant/", views.ask_assistant, name="ask_assistant"),
]
