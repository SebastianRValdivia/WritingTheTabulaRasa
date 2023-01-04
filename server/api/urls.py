# from django.urls import path, include
from django.urls import path, include

 
urlpatterns = [
    path("users/", include("user.api_urls")),
    path("notes/", include("applications.notes.api_urls")),
    path("schedules/", include("applications.schedule.api_urls")),
    path("tasks/", include("applications.tasks.api_urls")),
    path("resources/", include("applications.resources.api_urls")),
    path("cheatsheets/", include("applications.cheatsheets.api_urls")),
    path("guides/", include("applications.guides.api_urls")),
    path("encyclopedia/", include("applications.encyclopedia.api_urls")),
    path("researches/", include("applications.research.api_urls")),
    path("quizzes/", include("applications.quizzes.api_urls")),
    path("metadata/", include("applications.metadata.api_urls")),
]
