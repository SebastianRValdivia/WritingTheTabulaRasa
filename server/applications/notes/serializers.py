from rest_framework.serializers import (
    ModelSerializer,
    CurrentUserDefault,
    PrimaryKeyRelatedField,
    ValidationError,
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

    def validate_identifier(self, value):
        # Check if the identifier value is not used already in other note from
        # the same user
        other_note_with_same_identifier = NoteModel.objects.filter(
            owner=self.context.get('request').user,
            identifier=value,
        ).first()
        
        if other_note_with_same_identifier:
            raise ValidationError("Identifier not unique.")
        else:
            return value
        


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
