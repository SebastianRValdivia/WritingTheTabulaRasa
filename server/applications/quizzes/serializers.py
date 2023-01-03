from rest_framework.serializers import ModelSerializer

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel,
)

class QuizzSerializer(ModelSerializer):

    class Meta:
        model = QuizzModel
        fields = "__all__"

class QuizzFormulationQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzFormulationQuestionModel
        fields = "__all__"
