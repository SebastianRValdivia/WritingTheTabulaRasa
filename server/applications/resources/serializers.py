from rest_framework.serializers import ModelSerializer

from applications.resources.models import ReferenceModel

class ReferenceSerializer(ModelSerializer):

    class Meta:
        model = ReferenceModel
        fields = "__all__"