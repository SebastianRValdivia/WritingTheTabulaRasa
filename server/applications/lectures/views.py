from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListAPIView

from .models import LectureModel

from .serializers import LectureSerializer, LiteLectureSerializer

# Create your views here.
class LectureViewSet(ModelViewSet):

    queryset = LectureModel.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LiteLectureListAPIView(ListAPIView):
    queryset = LectureModel.objects.all()
    serializer_class = LiteLectureSerializer
