from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.schedule.views import ObjectiveViewSet, GoalViewSet

router = DefaultRouter()
router.register("goals", GoalViewSet, basename="goal")
router.register("objectives", ObjectiveViewSet, basename="objective")

urlpatterns = [
    path("", include(router.urls))
]