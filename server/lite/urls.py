from django.urls import path, include

from lite.views import IndexPageView

urlpatterns = [
    path("", IndexPageView.as_view(), name="index"),
    path("user/", include("user.urls")),
    path("cheatsheets/", include("applications.cheatsheets.urls")),
    path("guides/", include("applications.guides.urls")),
    path("metadata/", include("applications.metadata.urls")),
    path("resources/", include("applications.resources.urls")),
]
