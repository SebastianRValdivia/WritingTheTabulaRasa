from rest_framework import serializers

from applications.schedule.models import (
    ObjectiveModel,
    GoalModel,
)

class ObjectiveSerializer(serializers.ModelSerializer):

    class Meta:
        model = ObjectiveModel
        fields = "__all__"

class GoalSerializer(serializers.ModelSerializer):

  class Meta:
        model = GoalModel
        fields = "__all__"
