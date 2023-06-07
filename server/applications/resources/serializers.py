from rest_framework.serializers import ModelSerializer

from applications.resources.models import (
    LearningResourceModel,
    UserAssignedLearningResourceModel,
)

class LearningResourceSerializer(ModelSerializer):

    class Meta:
        model = LearningResourceModel
        fields = "__all__"

class UserAssignedLearningResourceSerializer(ModelSerializer):

    class Meta:
        model = UserAssignedLearningResourceModel
        fields = "__all__"
