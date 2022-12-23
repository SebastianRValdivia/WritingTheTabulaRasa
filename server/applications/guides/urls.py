from django.urls import path

from applications.guides.views import (
    GuideLiteListView,
    GuideLiteDetailView,
)

urlpatterns = [
    path("", GuideLiteListView.as_view(), name="guide_list"),
    path("<slug:url>/", GuideLiteDetailView.as_view(), name="guide_detail")
]
