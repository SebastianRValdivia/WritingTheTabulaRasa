from rest_framework.serializers import ModelSerializer

from applications.encyclopedia.models import (
    EncyclopediaPageModel,
    EncyclopediaCardModel
)

class EncyclopediaPageSerializer(ModelSerializer):

    class Meta:
        model = EncyclopediaPageModel
        fields = "__all__"

class EncyclopediaCardSerializer(ModelSerializer):

    class Meta:
        model = EncyclopediaCardModel
        fields = "__all__"
