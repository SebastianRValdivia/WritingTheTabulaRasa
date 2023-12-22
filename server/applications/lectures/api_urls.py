from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    LectureViewSet,
    LiteLectureListAPIView,
)

router = DefaultRouter()
router.register("", LectureViewSet, basename="lectures")

urlpatterns = [
  path("complete/", include(router.urls)),
  path("lite/", LiteLectureListAPIView.as_view(), name='lite-lecture-list'),
]

