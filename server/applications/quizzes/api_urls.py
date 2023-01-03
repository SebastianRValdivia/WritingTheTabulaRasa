from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.quizzes.views import (
    QuizzViewSet,
    QuizzQuestionViewSet,
)

router = DefaultRouter()
router.register("quizzes-objects/", QuizzViewSet, basename="quizzes")
router.register("questions", QuizzQuestionViewSet, basename="questions")

urlpatterns = [
    path("", include(router.urls))
]
