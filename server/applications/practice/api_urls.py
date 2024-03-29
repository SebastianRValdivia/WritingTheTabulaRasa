from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.practice.views import (
    PracticeRoutineViewSet,
    UserAssignedPracticeRoutineViewSet,
    PracticeCompletionViewSet,
    PracticeExerciseViewSet,
)

router = DefaultRouter()
router.register(
    "routines",
    PracticeRoutineViewSet,
    basename="practice-routine",
)
router.register(
    "assigned-routines",
    UserAssignedPracticeRoutineViewSet,
    basename="assigned-practices",
)
router.register(
    "completions",
    PracticeCompletionViewSet,
    basename="practice-completion",
)
router.register(
    "exercises",
    PracticeExerciseViewSet,
    basename="practice-exercises"
)

urlpatterns = [
    path("", include(router.urls))
]
