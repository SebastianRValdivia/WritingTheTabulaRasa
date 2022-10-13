# from django.urls import path, include
from django.urls import path, include

 
urlpatterns = [
    path("users/", include("user.api_urls")),
    path("notes/", include("applications.notes.api_urls")),
    path("schedules/", include("applications.schedule.api_urls")),
    path("tasks/", include("applications.tasks.api_urls")),
    path("resources/", include("applications.resources.api_urls")),
    path("cheatsheets/", include("applications.cheatsheets.api_urls")),
]
