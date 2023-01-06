from rest_framework.serializers import ModelSerializer

from applications.essays.models import (
    EssayModel
)

class EssaySerializer(ModelSerializer):

    class Meta:
        model = EssayModel
        fields = "__all__"
