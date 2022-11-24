from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.research.models import ResearchProcessModel
from applications.research.serializers import ResearchProcessSerializer 

# Create your views here.
class ResearchProcessViewSet(ModelViewSet):

    queryset = ResearchProcessModel.objects.all()
    serializer_class = ResearchProcessSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]