from rest_framework import viewsets, permissions
from django.views.generic import DetailView

from applications.metadata.models import MetadataModel
from applications.metadata.serializers import MetadataSerializer

# Create your views here.
class MetadataViewSet(viewsets.ModelViewSet):

    queryset = MetadataModel.objects.all().order_by("id")
    serializer_class = MetadataSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MetadataLiteDetailView(DetailView):

    model = MetadataModel
    context_object_name = "metadata"
    template_name = "metadata/metadata_detail.html"

