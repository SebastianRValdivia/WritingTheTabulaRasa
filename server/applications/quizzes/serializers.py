from rest_framework.serializers import ModelSerializer

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel,
    QuizzChoicesQuestionModel,
    QuizzChoiceModel,
)

class QuizzSerializer(ModelSerializer):

    class Meta:
        model = QuizzModel
        fields = "__all__"

class QuizzFormulationQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzFormulationQuestionModel
        fields = "__all__"

class QuizzChoicesQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzChoicesQuestionModel
        fields = "__all__"

class QuizzChoiceSerializer(ModelSerializer):

    class Meta:
        model = QuizzChoiceModel
        fields = "__all__"
