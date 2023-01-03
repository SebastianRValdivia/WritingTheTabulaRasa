from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.quizzes.views import (
    QuizzViewSet,
    QuizzFormulationQuestionViewSet,
    QuizzChoicesQuestionViewSet,
    QuizzChoiceViewSet,
)

router = DefaultRouter()
router.register("quizzes-objects", QuizzViewSet, basename="quizzes")
router.register(
    "formulation-questions",
    QuizzFormulationQuestionViewSet,
    basename="formulation-questions"
)
router.register(
    "choices-questions",
    QuizzChoicesQuestionViewSet,
    basename="choices-questions"
)
router.register(
    "choices",
    QuizzChoiceViewSet,
    basename="choices"
)

urlpatterns = [
    path("", include(router.urls))
]
