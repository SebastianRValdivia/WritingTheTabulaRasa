from rest_framework.serializers import ModelSerializer

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

class QuizzOrderListQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzOrderListQuestionModel
        fields = "__all__"

class QuizzListItemSerializer(ModelSerializer):

    class Meta:
        model = QuizzListItemModel
        fields = "__all__"

class QuizzJoinQuestionSerializer(ModelSerializer):

    class Meta:
        model = QuizzJoinQuestionModel
        fields = "__all__"

class QuizzJoinElementSerializer(ModelSerializer):

    class Meta:
        model = QuizzJoinElementModel
        fields = "__all__"
