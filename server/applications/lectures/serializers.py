from rest_framework.serializers import ModelSerializer

from .models import LectureModel

class LectureSerializer(ModelSerializer):

    class Meta:
        model = LectureModel
        fields = "__all__"

class LiteLectureSerializer(ModelSerializer):

    class Meta:
        model = LectureModel
        fields = ["title", "thumbnail", "updated", "created", "owner"]
