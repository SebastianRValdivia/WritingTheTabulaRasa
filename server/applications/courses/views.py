from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListAPIView

from .models import LectureModel, CourseModel

from .serializers import (
    CourseSerializer,
    LectureSerializer,
    LiteLectureSerializer,
)

# Create your views here.
class CourseViewSet(ModelViewSet):

    queryset = CourseModel.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LectureViewSet(ModelViewSet):

    queryset = LectureModel.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LiteLectureListAPIView(ListAPIView):
    queryset = LectureModel.objects.all()
    serializer_class = LiteLectureSerializer
