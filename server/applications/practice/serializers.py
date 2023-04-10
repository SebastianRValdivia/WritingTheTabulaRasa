from rest_framework.serializers import ModelSerializer

from applications.practice.models import (
    PracticeRoutineModel,
    UserAssignedPracticeRoutineModel,
    PracticeCompletionModel,
    PracticeExerciseModel,
)

class PracticeRoutineSerializer(ModelSerializer):

    class Meta:
        model = PracticeRoutineModel
        fields = "__all__"

class UserAssignedPracticeRoutineSerializer(ModelSerializer):

    class Meta:
        model = UserAssignedPracticeRoutineModel
        fields = "__all__"

class PracticeCompletionSerializer(ModelSerializer):

    class Meta:
        model = PracticeCompletionModel
        fields = "__all__"

class PracticeExerciseSerializer(ModelSerializer):

    class Meta:
        model = PracticeExerciseModel
        fields = "__all__"
