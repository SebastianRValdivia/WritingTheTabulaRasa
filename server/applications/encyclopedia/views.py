from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.encyclopedia.models import (
    EncyclopediaPageModel,
    EncyclopediaCardModel,
)
from applications.encyclopedia.serializers import (
    EncyclopediaPageSerializer,
    EncyclopediaCardSerializer,
)

# Create your views here.

class EncyclopediaPageViewSet(ModelViewSet):
    
    queryset = EncyclopediaPageModel.objects.all()
    serializer_class = EncyclopediaPageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["url"]


class EncyclopediaCardViewSet(ModelViewSet):

    queryset = EncyclopediaCardModel.objects.all()
    serializer_class = EncyclopediaCardSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["pg"]
