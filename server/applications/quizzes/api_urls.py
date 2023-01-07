from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.quizzes.views import (
    QuizzViewSet,
    QuizzFormulationQuestionViewSet,
    QuizzChoicesQuestionViewSet,
    QuizzChoiceViewSet,
    QuizzOrderListQuestionViewSet,
    QuizzListItemViewSet,
    QuizzJoinQuestionViewSet,
    QuizzJoinElementViewSet,
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
router.register(
    "list-questions",
    QuizzOrderListQuestionViewSet,
    basename="order-list-questions"
)
router.register(
    "list-items",
    QuizzListItemViewSet,
    basename="list-items"
)
router.register(
    "join-questions",
    QuizzJoinQuestionViewSet,
    basename="join-questions"
)
router.register(
    "join-element",
    QuizzJoinElementViewSet,
    basename="join-elements"
)

urlpatterns = [
    path("", include(router.urls))
]
