from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.metadata.views import MetadataViewSet

router = DefaultRouter()
router.register("", MetadataViewSet, basename="metadata")

urlpatterns = [
    path("", include(router.urls))
]
