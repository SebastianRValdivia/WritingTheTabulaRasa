from rest_framework.serializers import ModelSerializer

from .models import LectureModel

class LectureSerializer(ModelSerializer):

    class Meta:
        model = LectureModel
        fields = "__all__"
