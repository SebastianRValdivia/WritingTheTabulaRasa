from rest_framework.serializers import ModelSerializer

from applications.news.models import NewModel

class NewSerializer(ModelSerializer):

    class Meta:
        model = NewModel
        fields = "__all__"
