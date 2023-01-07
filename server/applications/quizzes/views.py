from rest_framework import viewsets, permissions

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel,
    QuizzChoicesQuestionModel,
    QuizzChoiceModel,
    QuizzOrderListQuestionModel,
    QuizzListItemModel,
    QuizzJoinQuestionModel,
    QuizzJoinElementModel,
)
from applications.quizzes.serializers import (
    QuizzSerializer,
    QuizzFormulationQuestionSerializer,
    QuizzChoicesQuestionSerializer,
    QuizzChoiceSerializer,
    QuizzOrderListQuestionSerializer,
    QuizzListItemSerializer,
    QuizzJoinQuestionSerializer,
    QuizzJoinElementSerializer,
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

class QuizzChoicesQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzChoicesQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzChoicesQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["quizz"]

class QuizzChoiceViewSet(viewsets.ModelViewSet):

    queryset = QuizzChoiceModel.objects.all().order_by("id")
    serializer_class = QuizzChoiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]

class QuizzOrderListQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzOrderListQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzOrderListQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["quizz"]

class QuizzListItemViewSet(viewsets.ModelViewSet):

    queryset = QuizzListItemModel.objects.all().order_by("id")
    serializer_class = QuizzListItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]

class QuizzJoinQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzJoinQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzJoinQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["quizz"]

class QuizzJoinElementViewSet(viewsets.ModelViewSet):

    queryset = QuizzJoinElementModel.objects.all().order_by("id")
    serializer_class = QuizzJoinElementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]
