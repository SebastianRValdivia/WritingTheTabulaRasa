from rest_framework import viewsets, permissions

from applications.notes.models import NoteModel
from applications.notes.serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    
    queryset = NoteModel.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]