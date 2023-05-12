from django.contrib import admin

from applications.notes.models import (
  NoteModel,
  NoteConnectionGroupModel,
  FleetingNoteModel,
  LiteraryNoteModel,
)

# Register your models here.
admin.site.register(NoteModel)
admin.site.register(NoteConnectionGroupModel)
admin.site.register(FleetingNoteModel)
admin.site.register(LiteraryNoteModel)

