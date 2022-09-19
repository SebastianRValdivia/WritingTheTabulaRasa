from django.db.models import Q

from rest_framework import serializers
from applications.notes.models import NoteModel

# Create your views here.
class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = NoteModel
        fields = "__all__"

    def validate_identifier(self, data):
        query = Q(parent=self.initial_data["parent"]) & Q(identifier=self.initial_data["identifier"])
        identifiers_notes_of_same_parent = NoteModel.objects.filter(query)
        if identifiers_notes_of_same_parent.exists():
            raise serializers.ValidationError(
                self.initial_data["identifier"] + " is repeated"
            )

        return data