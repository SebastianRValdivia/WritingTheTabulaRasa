from django.urls import path

from applications.news.views import NewListView

urlpatterns = [
    path("", NewListView.as_view(), name="news-list")
]

