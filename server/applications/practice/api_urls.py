from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.practice.views import (
    PracticeRoutineViewSet,
    PracticeCompletionViewSet
)

router = DefaultRouter()
router.register(
    "routines",
    PracticeRoutineViewSet,
    basename="practice-routine"
)
router.register(
    "completions",
    PracticeCompletionViewSet,
    basename="practice-completion"
)

urlpatterns = [
    path("", include(router.urls))
]
