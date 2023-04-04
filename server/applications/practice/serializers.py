from rest_framework.serializers import ModelSerializer

from applications.practice.models import (
    PracticeRoutineModel,
    PracticeCompletionModel,
)

class PracticeRoutineSerializer(ModelSerializer):

    class Meta:
        model = PracticeRoutineModel
        fields = "__all__"

class PracticeCompletionSerializer(ModelSerializer):

    class Meta:
        model = PracticeCompletionModel
        fields = "__all__"
