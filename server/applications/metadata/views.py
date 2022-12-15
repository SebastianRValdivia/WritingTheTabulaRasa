from rest_framework import viewsets, permissions

from applications.metadata.models import MetadataModel
from applications.metadata.serializers import MetadataSerializer

# Create your views here.
class MetadataViewSet(viewsets.ModelViewSet):

    queryset = MetadataModel.objects.all().order_by("id")
    serializer_class = MetadataSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
