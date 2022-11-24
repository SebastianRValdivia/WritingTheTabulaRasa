from rest_framework.routers import DefaultRouter
from django.urls import path, include

from applications.research.views import ResearchProcessViewSet

router = DefaultRouter()
router.register("process", ResearchProcessViewSet, basename="process")


urlpatterns = [
    path("", include(router.urls))
]