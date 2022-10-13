from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.cheatsheets.views import SheetViewSet, CheatViewSet

router = DefaultRouter()
router.register("sheets", SheetViewSet, basename="sheet")
router.register("cheats", CheatViewSet, basename="cheat")

urlpatterns = [
    path("", include(router.urls))
]