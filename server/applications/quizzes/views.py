from rest_framework import viewsets, permissions

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel,
)
from applications.quizzes.serializers import (
    QuizzSerializer,
    QuizzFormulationQuestionSerializer,
)

# Create your views here.
class QuizzViewSet(viewsets.ModelViewSet):

    queryset = QuizzModel.objects.all().order_by("id")
    serializer_class = QuizzSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class QuizzFormulationQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzFormulationQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzFormulationQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["quizz"]
