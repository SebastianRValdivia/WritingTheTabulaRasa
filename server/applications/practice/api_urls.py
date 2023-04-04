from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.practice.views import (
    PracticeRoutineViewSet,
    PracticeCompletionViewSet
)

router = DefaultRouter()
router.register(
    "routine",
    PracticeRoutineViewSet,
    basename="practice-routine"
)
router.register(
    "completion",
    PracticeCompletionViewSet,
    basename="practice-completion"
)

urlpatterns = [
    path("", include(router.urls))
]
