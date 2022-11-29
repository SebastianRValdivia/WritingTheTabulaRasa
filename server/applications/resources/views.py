from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.resources.models import ReferenceModel, ImageModel
from applications.resources.serializers import ReferenceSerializer, ImageSerializer

# Create your views here.
class ReferenceViewSet(ModelViewSet):

    queryset = ReferenceModel.objects.all()
    serializer_class = ReferenceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ImageViewSet(ModelViewSet):

    queryset = ImageModel.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
