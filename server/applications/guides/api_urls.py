from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.guides.views import GuideViewSet, StepViewSet

router = DefaultRouter()
router.register("guides", GuideViewSet, basename="guides")
router.register("steps", StepViewSet, basename="steps")

urlpatterns = [
    path("", include(router.urls))
]
