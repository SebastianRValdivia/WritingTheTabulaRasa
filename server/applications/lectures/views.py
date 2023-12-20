from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import LectureModel

from .serializers import LectureSerializer

# Create your views here.
class LectureViewSet(ModelViewSet):

    queryset = LectureModel.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

