from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.guides.models import GuideModel, StepModel
from applications.guides.serializers import GuideSerializer, StepSerializer

# Create your views here.
class GuideViewSet(ModelViewSet):

    queryset = GuideModel.objects.all().order_by("id")
    serializer_class = GuideSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["url"]

class StepViewSet(ModelViewSet):

    queryset = StepModel.objects.all().order_by("id")
    serializer_class = StepSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["guide"]




