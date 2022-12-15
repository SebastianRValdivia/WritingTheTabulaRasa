from rest_framework.serializers import ModelSerializer

from applications.metadata.models import MetadataModel

class MetadataSerializer(ModelSerializer):

    class Meta:
        model = MetadataModel
        fields = "__all__"
