from rest_framework import viewsets, permissions

from applications.quizzes.models import (
    QuizzModel,
    QuizzQuestionModel,
)
from applications.quizzes.serializers import (
    QuizzSerializer,
    QuizzQuestionSerializer,
)

# Create your views here.
class QuizzViewSet(viewsets.ModelViewSet):

    queryset = QuizzModel.objects.all().order_by("id")
    serializer_class = QuizzSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class QuizzQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["quizz"]
