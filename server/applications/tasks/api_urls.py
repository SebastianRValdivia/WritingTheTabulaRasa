
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.tasks.views import TaskViewSet

router = DefaultRouter()
router.register("", TaskViewSet, basename="task")

urlpatterns = [
    path("", include(router.urls))
]