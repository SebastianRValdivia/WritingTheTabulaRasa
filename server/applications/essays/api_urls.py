from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.essays.views import EssayViewSet

router = DefaultRouter()
router.register("", EssayViewSet, basename="essays")

urlpatterns = [
    path("", include(router.urls))
]

