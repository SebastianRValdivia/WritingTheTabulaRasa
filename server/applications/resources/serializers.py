from rest_framework.serializers import ModelSerializer

from applications.resources.models import (
    LearningResourceModel,
    ImageModel,
)

class LearningResourceSerializer(ModelSerializer):

    class Meta:
        model = LearningResourceModel
        fields = "__all__"

class ImageSerializer(ModelSerializer):

    class Meta:
        model = ImageModel
        fields = "__all__"
