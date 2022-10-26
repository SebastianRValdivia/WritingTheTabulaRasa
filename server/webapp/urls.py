from django.urls import path

from webapp.views import WebappView
urlpatterns = [
    path("", WebappView.as_view())
]
