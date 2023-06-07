from rest_framework.serializers import ModelSerializer

from applications.images.models import ImageModel

class ImageSerializer(ModelSerializer):

    class Meta:
        model = ImageModel
        fields = "__all__"
