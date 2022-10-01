from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.tasks.serializers import TaskSerializer
from applications.tasks.models import TaskModel

# Create your views here.
class TaskViewSet(ModelViewSet):

    queryset = TaskModel.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]
