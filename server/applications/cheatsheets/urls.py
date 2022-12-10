from django.urls import path

from applications.cheatsheets.views import (
    SheetLiteListView,
    SheetLiteDetailView,
)

urlpatterns = [
    path("sheets/", SheetLiteListView.as_view(), name="sheet_list"),
    path(
        "sheets/<slug:url>/",
        SheetLiteDetailView.as_view(),
        name="sheet_detail"
    ),
]
