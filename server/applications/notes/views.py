from rest_framework import viewsets, permissions
from django.core.exceptions import PermissionDenied

from applications.notes.models import (
    NoteModel, 
    NoteConnectionGroupModel,
    FleetingNoteModel,
    LiteraryNoteModel,
)
from applications.notes.serializers import (
    NoteSerializer,
    NoteConnectionGroupSerializer,
    FleetingNoteSerializer,
    LiteraryNoteSerializer,
)

class NoteViewSet(viewsets.ModelViewSet):
    
    queryset = NoteModel.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(owner=request.user)

    def perform_update(self, serializer):
        note_obj = self.get_object()
        if self.request.user != note_obj.owner:
            raise PermissionDenied('Not note owner')
        serializer.save()

class NoteConnectionGroupViewSet(viewsets.ModelViewSet):

    queryset = NoteConnectionGroupModel.objects.all().order_by("id")
    serializer_class = NoteConnectionGroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(owner=request.user)

    def perform_update(self, serializer):
        note_obj = self.get_object()
        if self.request.user != note_obj.owner:
            raise PermissionDenied('Not note owner')
        serializer.save()

class FleetingNoteViewSet(viewsets.ModelViewSet):

    queryset = FleetingNoteModel.objects.all()
    serializer_class = FleetingNoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(owner=request.user)

    def perform_update(self, serializer):
        note_obj = self.get_object()
        if self.request.user != note_obj.owner:
            raise PermissionDenied('Not note owner')
        serializer.save()

class LiteraryNoteViewSet(viewsets.ModelViewSet):

    queryset = LiteraryNoteModel.objects.all()
    serializer_class = LiteraryNoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(owner=request.user)

    def perform_update(self, serializer):
        note_obj = self.get_object()
        if self.request.user != note_obj.owner:
            raise PermissionDenied('Not note owner')
        serializer.save()
