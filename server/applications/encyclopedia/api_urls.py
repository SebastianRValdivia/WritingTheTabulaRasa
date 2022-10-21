from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.encyclopedia.views import (
    EncyclopediaPageViewSet
)

router = DefaultRouter()
router.register("pages", EncyclopediaPageViewSet, basename="encyclopedia pages")

urlpatterns = [
    path("", include(router.urls))
]