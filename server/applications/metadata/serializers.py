from rest_framework.serializers import ModelSerializer

from applications.metadata.models import MetadataModel, CategoryModel

class MetadataSerializer(ModelSerializer):

    class Meta:
        model = MetadataModel
        fields = "__all__"

class CategorySerializer(ModelSerializer):

    class Meta:
        model = CategoryModel
        fields = "__all__"
