from rest_framework import serializers
from applications.notes.models import NoteModel

# Create your views here.
class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = NoteModel
        fields = "__all__"
