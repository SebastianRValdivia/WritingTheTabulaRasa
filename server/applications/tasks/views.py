from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser

from applications.tasks.serializers import TaskSerializer
from applications.tasks.models import TaskModel
from config.permissions import (IsOwner)

# Create your views here.
class TaskViewSet(ModelViewSet):

    serializer_class = TaskSerializer
    permission_classes = [IsOwner,]
    filterset_fields = ["owner"]

    def get_queryset(self):
        user = self.request.user
        return TaskModel.objects.filter(owner=user.pk)

