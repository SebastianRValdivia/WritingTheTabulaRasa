from rest_framework.serializers import ModelSerializer

from applications.quotes.models import QuoteModel

class QuoteSerializer(ModelSerializer):

    class Meta:
        model = QuoteModel
        fields = "__all__"
