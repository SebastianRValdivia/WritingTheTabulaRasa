from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from applications.practice.models import (
    PracticeRoutineModel,
    PracticeCompletionModel,
)
from applications.practice.serializers import (
    PracticeRoutineSerializer,
    PracticeCompletionSerializer
)
# Create your views here.
class PracticeRoutineViewSet(ModelViewSet):

    queryset = PracticeRoutineModel.objects.all().order_by("id")
    serializer_class = PracticeRoutineSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PracticeCompletionViewSet(ModelViewSet):

    queryset = PracticeCompletionModel.objects.all().order_by("id")
    serializer_class = PracticeCompletionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

