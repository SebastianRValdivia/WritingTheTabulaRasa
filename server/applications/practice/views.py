from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from applications.practice.models import (
    PracticeRoutineModel,
    UserAssignedPracticeRoutineModel,
    PracticeCompletionModel,
    PracticeExerciseModel,
)
from applications.practice.serializers import (
    PracticeRoutineSerializer,
    UserAssignedPracticeRoutineSerializer,
    PracticeCompletionSerializer,
    PracticeExerciseSerializer,
)
# Create your views here.
class PracticeRoutineViewSet(ModelViewSet):

    queryset = PracticeRoutineModel.objects.all().order_by("id")
    serializer_class = PracticeRoutineSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserAssignedPracticeRoutineViewSet(ModelViewSet):

    queryset = UserAssignedPracticeRoutineModel.objects.all().order_by("id")
    serializer_class = UserAssignedPracticeRoutineSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

class PracticeCompletionViewSet(ModelViewSet):

    queryset = PracticeCompletionModel.objects.all().order_by("id")
    serializer_class = PracticeCompletionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

class PracticeExerciseViewSet(ModelViewSet):

    queryset = PracticeExerciseModel.objects.all().order_by("id")
    serializer_class = PracticeExerciseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["routine"]
