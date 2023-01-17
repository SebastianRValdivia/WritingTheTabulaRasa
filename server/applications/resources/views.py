from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.resources.models import (
    LearningResourceModel,
    ImageModel,
)
from applications.resources.serializers import (
    LearningResourceSerializer,
    ImageSerializer,
)

# Create your views here.
class LearningResourceViewSet(ModelViewSet):

    queryset = LearningResourceModel.objects.all()
    serializer_class = LearningResourceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ImageViewSet(ModelViewSet):

    queryset = ImageModel.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
