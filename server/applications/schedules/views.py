from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.schedules.models import (
    ObjectiveModel,
    GoalModel,
    UserTimeTableModel,
    UserHourModel,
)
from applications.schedules.serializers import (
    ObjectiveSerializer,
    GoalSerializer,
    UserHourSerializer,
    UserTimeTableSerializer,
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

class UserTimeTableViewSet(ModelViewSet):

    queryset = UserTimeTableModel.objects.all().order_by("id")
    serializer_class = UserTimeTableSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

class UserHourViewSet(ModelViewSet):

    queryset = UserHourModel.objects.all().order_by("id")
    serializer_class = UserHourSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["table", "owner"]


