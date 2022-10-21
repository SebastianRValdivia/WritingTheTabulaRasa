from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.encyclopedia.models import EncyclopediaPageModel
from applications.encyclopedia.serializers import EncyclopediaPageSerializer

# Create your views here.

class EncyclopediaPageViewSet(ModelViewSet):
    
    queryset = EncyclopediaPageModel.objects.all()
    serializer_class = EncyclopediaPageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


