from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.essays.models import EssayModel
from applications.essays.serializers import EssaySerializer

# Create your views here.
class EssayViewSet(ModelViewSet):

    queryset = EssayModel.objects.all().order_by("id")
    serializer_class = EssaySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["url", "owner"]
