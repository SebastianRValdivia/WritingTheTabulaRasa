from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.resources.views import ReferenceViewSet

router = DefaultRouter()
router.register("reference", ReferenceViewSet, basename="references")

urlpatterns = [
  path("", include(router.urls))
]