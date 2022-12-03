from django.urls import path, include

from lite.views import IndexPageView

urlpatterns = [
    path("", IndexPageView.as_view(), name="index")
]
