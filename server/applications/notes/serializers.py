from rest_framework.serializers import (
    ModelSerializer,
    CurrentUserDefault,
    PrimaryKeyRelatedField,
)

from applications.notes.models import (
    NoteModel,
    NoteConnectionGroupModel,
    FleetingNoteModel, 
    LiteraryNoteModel,
)

# Create your views here.
class NoteSerializer(ModelSerializer):

    owner = PrimaryKeyRelatedField(
        read_only=True,
        default=CurrentUserDefault()
    )

    class Meta:
        model = NoteModel
        fields = "__all__"

class NoteConnectionGroupSerializer(ModelSerializer):

    owner = PrimaryKeyRelatedField(
        read_only=True,
        default=CurrentUserDefault()
    )

    class Meta:
        model = NoteConnectionGroupModel
        fields = "__all__"

class FleetingNoteSerializer(ModelSerializer):

    owner = PrimaryKeyRelatedField(
        read_only=True,
        default=CurrentUserDefault()
    )

    class Meta:
        model = FleetingNoteModel
        fields = "__all__"

class LiteraryNoteSerializer(ModelSerializer):

    owner = PrimaryKeyRelatedField(
        read_only=True,
        default=CurrentUserDefault()
    )

    class Meta:
        model = LiteraryNoteModel
        fields = "__all__"
