from rest_framework.serializers import ModelSerializer

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

class QuizzSerializer(ModelSerializer):

    class Meta:
        model = QuizzModel
        fields = "__all__"

class QuizzQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzQuestionModel
        fields = "__all__"

class QuizzFormulationQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzFormulationQuestionModel
        fields = "__all__"

class QuizzListItemQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzListItemQuestionModel
        fields = "__all__"

class QuizzJoinElementQuestionSerializer(ModelSerializer):

    class Meta: 
        model = QuizzJoinElementQuestionModel
        fields = "__all__"

class QuizzChoiceQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzChoiceQuestionModel
        fields = "__all__"

class FlashCardSerializer(ModelSerializer):

    class Meta:
        model = FlashCardModel
        fields = "__all__"

class FlashCardCollectionSerializer(ModelSerializer):

    class Meta:
        model = FlashCardCollectionModel
        fields = "__all__"

class FlashCardTestResultSerializer(ModelSerializer):

    class Meta:
        model = FlashCardTestResultModel
        fields = "__all__"
