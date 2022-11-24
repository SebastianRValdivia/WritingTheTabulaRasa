from rest_framework.serializers import ModelSerializer

from applications.research.models import ResearchProcessModel

class ResearchProcessSerializer(ModelSerializer):
    
    class Meta:
        model = ResearchProcessModel
        fields = "__all__"