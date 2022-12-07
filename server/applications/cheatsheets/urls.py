from django.urls import path

from applications.cheatsheets.views import SheetLiteListView

urlpatterns = [
    path("sheets/", SheetLiteListView.as_view(), name="sheet_list")
]
