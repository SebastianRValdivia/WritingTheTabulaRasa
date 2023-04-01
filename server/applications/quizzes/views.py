from rest_framework import viewsets, permissions

from applications.quizzes.models import (
    QuizzModel,
    QuizzQuestionModel,
    QuizzFormulationQuestionModel,
    QuizzListItemQuestionModel,
    QuizzJoinElementQuestionModel,
    QuizzChoiceQuestionModel,
    FlashCardModel,
    FlashCardCollectionModel,
    FlashCardTestResultModel,
)
from applications.quizzes.serializers import (
    QuizzSerializer,
    QuizzQuestionSerializer,
    QuizzFormulationQuestionSerializer,
    QuizzListItemQuestionSerializer,
    QuizzJoinElementQuestionSerializer,
    QuizzChoiceQuestionSerializer,
    FlashCardSerializer,
    FlashCardCollectionSerializer,
    FlashCardTestResultSerializer,
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

class QuizzFormulationQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzFormulationQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzFormulationQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]

class QuizzListItemQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzListItemQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzListItemQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]

class QuizzJoinElementQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzJoinElementQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzJoinElementQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]

class QuizzChoiceQuestionViewSet(viewsets.ModelViewSet):

    queryset = QuizzChoiceQuestionModel.objects.all().order_by("id")
    serializer_class = QuizzChoiceQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["question"]

class FlashCardViewSet(viewsets.ModelViewSet):

    queryset = FlashCardModel.objects.all().order_by("id")
    serializer_class = FlashCardSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["collection"]

class FlashCardCollectionViewSet(viewsets.ModelViewSet):

    queryset = FlashCardCollectionModel.objects.all().order_by("id")
    serializer_class = FlashCardCollectionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class FlashCardTestResultViewSet(viewsets.ModelViewSet):

    queryset = FlashCardTestResultModel.objects.all().order_by("id")
    serializer_class = FlashCardTestResultSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner"]
