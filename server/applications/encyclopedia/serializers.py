from rest_framework.serializers import (
    ModelSerializer,
    CurrentUserDefault,
    PrimaryKeyRelatedField,
)

from applications.encyclopedia.models import (
    EncyclopediaPageModel,
    EncyclopediaCardModel,
    EncyclopediaDiscussionPostModel,
)

class EncyclopediaPageSerializer(ModelSerializer):

    class Meta:
        model = EncyclopediaPageModel
        fields = "__all__"

class EncyclopediaCardSerializer(ModelSerializer):

    class Meta:
        model = EncyclopediaCardModel
        fields = "__all__"

class EncyclopediaDiscussionPostSerializer(ModelSerializer):

    owner = PrimaryKeyRelatedField(
        read_only=True,
        default=CurrentUserDefault()
    )

    class Meta:
        model = EncyclopediaDiscussionPostModel
        fields = "__all__"
        read_only_fields = ["owner"]
