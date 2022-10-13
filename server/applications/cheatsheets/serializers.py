from rest_framework.serializers import ModelSerializer

from applications.cheatsheets.models import CheatModel, SheetModel

class CheatSerializer(ModelSerializer):

    class Meta:
        model = CheatModel
        fields = "__all__"

class SheetSerializer(ModelSerializer):

    class Meta:
        model = SheetModel
        fields = "__all__"