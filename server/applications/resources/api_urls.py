from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.resources.views import (
    LearningResourceViewSet,
    UserAssignedLearningResourceViewSet,
)

router = DefaultRouter()
router.register(
    "learning",
    LearningResourceViewSet,
    basename="learning-resources",
)
router.register(
    "user-learning",
    UserAssignedLearningResourceViewSet,
    basename="user-assigned-learning-resources",
)

urlpatterns = [
  path("", include(router.urls))
]
