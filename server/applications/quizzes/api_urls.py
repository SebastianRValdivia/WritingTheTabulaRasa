from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.quizzes.views import (
    QuizzViewSet,
    QuizzQuestionViewSet,
    QuizzFormulationQuestionViewSet,
    QuizzListItemQuestionViewSet,
    QuizzJoinElementQuestionViewSet,
    QuizzChoiceQuestionViewSet,
)

router = DefaultRouter()
router.register("quizzes-objects", QuizzViewSet, basename="quizzes")
router.register(
    "quizz-questions",
    QuizzQuestionViewSet,
    basename="quizz-question"
)
router.register(
    "question-formulations",
    QuizzFormulationQuestionViewSet,
    basename="question-formulation"
)
router.register(
    "question-list-items",
    QuizzListItemQuestionViewSet,
    basename="question-list-item"
)
router.register(
    "question-join-elements",
    QuizzJoinElementQuestionViewSet,
    basename="question-join-element"
)
router.register(
    "question-choices",
    QuizzChoiceQuestionViewSet,
    basename="question-choice"
)

urlpatterns = [
    path("", include(router.urls))
]
