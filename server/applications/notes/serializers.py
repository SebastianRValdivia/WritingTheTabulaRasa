from rest_framework import serializers

from applications.notes.models import (
    NoteModel,
    NoteConnectionGroupModel,
    FleetingNoteModel, 
    LiteraryNoteModel,
)

# Create your views here.
class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = NoteModel
        fields = "__all__"

class NoteConnectionGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = NoteConnectionGroupModel
        fields = "__all__"

class FleetingNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = FleetingNoteModel
        fields = "__all__"

class LiteraryNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = LiteraryNoteModel
        fields = "__all__"
