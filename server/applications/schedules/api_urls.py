from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.schedules.views import (
    ObjectiveViewSet,
    GoalViewSet,
    UserTimeTableViewSet,
    UserHourViewSet,
)

router = DefaultRouter()
router.register("goals", GoalViewSet, basename="goal")
router.register("objectives", ObjectiveViewSet, basename="objective")
router.register("timetables", UserTimeTableViewSet, basename="timetable")
router.register("hours", UserHourViewSet, basename="hour")

urlpatterns = [
    path("", include(router.urls))
]
