from rest_framework import viewsets, permissions

from applications.notes.models import NoteModel, FleetingNoteModel
from applications.notes.serializers import (
    NoteSerializer,
    FleetingNoteSerializer
)

class NoteViewSet(viewsets.ModelViewSet):
    
    queryset = NoteModel.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

class FleetingNoteViewSet(viewsets.ModelViewSet):

    queryset = FleetingNoteModel.objects.all()
    serializer_class = FleetingNoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]