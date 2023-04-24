from rest_framework import serializers

from applications.schedules.models import (
    ObjectiveModel,
    GoalModel,
    UserHourModel,
    UserTimeTableModel,
)

class ObjectiveSerializer(serializers.ModelSerializer):

    class Meta:
        model = ObjectiveModel
        fields = "__all__"

class GoalSerializer(serializers.ModelSerializer):

  class Meta:
        model = GoalModel
        fields = "__all__"

class UserHourSerializer(serializers.ModelSerializer):

  class Meta:
        model = UserHourModel
        fields = "__all__"

class UserTimeTableSerializer(serializers.ModelSerializer):

  class Meta:
        model = UserTimeTableModel
        fields = "__all__"
