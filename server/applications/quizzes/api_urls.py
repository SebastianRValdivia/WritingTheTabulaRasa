from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.quizzes.views import (
    QuizzViewSet,
    QuizzFormulationQuestionViewSet,
)

router = DefaultRouter()
router.register("quizzes-objects", QuizzViewSet, basename="quizzes")
router.register(
    "formulation-questions",
    QuizzFormulationQuestionViewSet,
    basename="questions"
)

urlpatterns = [
    path("", include(router.urls))
]
