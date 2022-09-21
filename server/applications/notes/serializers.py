from django.db.models import Q

from rest_framework import serializers
from applications.notes.models import NoteModel

# Create your views here.
class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = NoteModel
        fields = "__all__"

    def validate_identifier(self, data):
        identifiers_of_same_parent = NoteModel.objects.filter(parent=self.initial_data["parent"]).filter(identifier=self.initial_data["identifier"])
        if identifiers_of_same_parent.exists():
            raise serializers.ValidationError(
                str(self.initial_data["identifier"]) + " is repeated"
            )

        return data