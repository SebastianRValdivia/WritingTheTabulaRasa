from django.urls import path

from applications.guides.views import (
    GuideLiteListView,
    GuideLiteDetailView,
    GuideLiteCreateView,
)

urlpatterns = [
    path("list/", GuideLiteListView.as_view(), name="guide_list"),
    path("detail-of/<slug:url>/", GuideLiteDetailView.as_view(), name="guide_detail"),
    path("new/", GuideLiteCreateView.as_view(), name="guide_new"),
]
