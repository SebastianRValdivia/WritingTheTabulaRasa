from rest_framework.serializers import ModelSerializer

from applications.resources.models import ReferenceModel, ImageModel

class ReferenceSerializer(ModelSerializer):

    class Meta:
        model = ReferenceModel
        fields = "__all__"

class ImageSerializer(ModelSerializer):

    class Meta:
        model = ImageModel
        fields = "__all__"
