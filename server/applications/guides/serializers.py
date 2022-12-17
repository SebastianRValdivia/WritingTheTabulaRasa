from rest_framework.serializers import ModelSerializer

from applications.guides.models import GuideModel, StepModel


class GuideSerializer(ModelSerializer):

    class Meta:
        model = GuideModel
        fields = "__all__"

class StepSerializer(ModelSerializer):

    class Meta:
        model = StepModel
        fields = "__all__"
