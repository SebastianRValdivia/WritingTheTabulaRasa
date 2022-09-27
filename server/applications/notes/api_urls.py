from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.notes.views import NoteViewSet, FleetingNoteViewSet

router = DefaultRouter()
router.register("permanent", NoteViewSet, basename="notes")
router.register("fleeting", FleetingNoteViewSet, basename="fleeting-notes")

urlpatterns = [
    path("", include(router.urls))
]