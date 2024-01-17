from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CourseViewSet,
    LectureViewSet,
    LiteLectureListAPIView,
)

router = DefaultRouter()
router.register("courses-info", CourseViewSet, basename="course")
router.register("lectures", LectureViewSet, basename="lectures")

urlpatterns = [
  path("", include(router.urls)),
  path("lite/lectures/", LiteLectureListAPIView.as_view(), name='lite-lecture-list'),
]

