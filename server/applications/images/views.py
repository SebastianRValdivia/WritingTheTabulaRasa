from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.images.models import ImageModel

from applications.images.serializers import ImageSerializer

# Create your views here.
class ImageViewSet(ModelViewSet):

    queryset = ImageModel.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

