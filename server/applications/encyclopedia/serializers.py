from rest_framework.serializers import ModelSerializer

from applications.encyclopedia.models import (
    EncyclopediaPageModel
)

class EncyclopediaPageSerializer(ModelSerializer):

    class Meta:
        model = EncyclopediaPageModel
        fields = "__all__"


