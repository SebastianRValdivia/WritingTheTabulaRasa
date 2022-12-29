from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.metadata.views import (
    MetadataViewSet,
    CategoryViewSet,
)

router = DefaultRouter()
router.register("metadata", MetadataViewSet, basename="metadata")
router.register("categories", CategoryViewSet, basename="categories")

urlpatterns = [
    path("", include(router.urls))
]
