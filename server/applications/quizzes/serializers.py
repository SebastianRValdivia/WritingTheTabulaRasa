from rest_framework.serializers import ModelSerializer

from applications.quizzes.models import (
    QuizzModel,
    QuizzQuestionModel,
)

class QuizzSerializer(ModelSerializer):

    class Meta:
        model = QuizzModel
        fields = "__all__"

class QuizzQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzQuestionModel
        fields = "__all__"
