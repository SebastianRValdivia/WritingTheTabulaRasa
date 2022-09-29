from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.schedule.models  import ObjectiveModel, GoalModel
from applications.schedule.serializers import (
    ObjectiveSerializer,
    GoalSerializer,
)

# Create your views here.
class GoalViewSet(ModelViewSet):

    queryset = GoalModel.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner", "finish"]

class ObjectiveViewSet(ModelViewSet):

    queryset = ObjectiveModel.objects.all()
    serializer_class = ObjectiveSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner", "goal", "date"]


