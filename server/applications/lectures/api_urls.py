from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    LectureViewSet,
)

router = DefaultRouter()
router.register("", LectureViewSet, basename="lectures")

urlpatterns = [
  path("", include(router.urls))
]
