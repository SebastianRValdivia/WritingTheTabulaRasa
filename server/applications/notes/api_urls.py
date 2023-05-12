from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.notes.views import (
    NoteViewSet,
    NoteConnectionGroupViewSet,
    FleetingNoteViewSet,
    LiteraryNoteViewSet,
)

router = DefaultRouter()
router.register("permanent", NoteViewSet, basename="notes")
router.register(
    "connections",
    NoteConnectionGroupViewSet,
    basename="notes-connections"
)
router.register("fleeting", FleetingNoteViewSet, basename="fleeting-notes")
router.register("literary", LiteraryNoteViewSet, basename="literary-notes")

urlpatterns = [
    path("", include(router.urls))
]
