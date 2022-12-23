from django.urls import path

from applications.guides.views import (
    GuideLiteListView
)

urlpatterns = [
    path("", GuideLiteListView.as_view(), name="guide_list"),
]
