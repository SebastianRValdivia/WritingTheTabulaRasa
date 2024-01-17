from rest_framework.serializers import ModelSerializer

from .models import LectureModel, CourseModel

class CourseSerializer(ModelSerializer):

    class Meta:
        model = CourseModel
        fields = "__all__"

class LectureSerializer(ModelSerializer):

    class Meta:
        model = LectureModel
        fields = "__all__"

class LiteLectureSerializer(ModelSerializer):

    class Meta:
        model = LectureModel
        fields = ["title", "updated", "created", "owner"]
