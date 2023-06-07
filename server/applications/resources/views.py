from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.views.generic import ListView, DetailView

from applications.resources.models import (
    LearningResourceModel,
    UserAssignedLearningResourceModel,
)
from applications.resources.serializers import (
    LearningResourceSerializer,
    UserAssignedLearningResourceSerializer,
)

# Create your views here.
class LearningResourceViewSet(ModelViewSet):

    queryset = LearningResourceModel.objects.all()
    serializer_class = LearningResourceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class UserAssignedLearningResourceViewSet(ModelViewSet):

    queryset = UserAssignedLearningResourceModel.objects.all().order_by("id")
    serializer_class = UserAssignedLearningResourceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]

class LearningResourceLiteListView(ListView):

    model = LearningResourceModel
    context_object_name = "learning_resources"
    template_name = "resources/learning_resource_list.html"
