from rest_framework import viewsets, permissions

from applications.notes.models import (
    NoteModel, 
    FleetingNoteModel,
    LiteraryNoteModel,
)
from applications.notes.serializers import (
    NoteSerializer,
    FleetingNoteSerializer,
    LiteraryNoteSerializer,
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

class LiteraryNoteViewSet(viewsets.ModelViewSet):

    queryset = LiteraryNoteModel.objects.all()
    serializer_class = LiteraryNoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]