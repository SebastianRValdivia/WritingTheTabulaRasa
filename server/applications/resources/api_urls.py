from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.resources.views import ReferenceViewSet, ImageViewSet

router = DefaultRouter()
router.register("reference", ReferenceViewSet, basename="references")
router.register("images", ImageViewSet, basename="images")

urlpatterns = [
  path("", include(router.urls))
]
