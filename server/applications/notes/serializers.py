from rest_framework import serializers

from applications.notes.models import (
    NoteModel,
    FleetingNoteModel, 
    LiteraryNoteModel
)

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

class FleetingNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = FleetingNoteModel
        fields = "__all__"

class LiteraryNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = LiteraryNoteModel
        fields = "__all__"