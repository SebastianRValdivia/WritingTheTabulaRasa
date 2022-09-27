from django.contrib import admin

from applications.notes.models import NoteModel, FleetingNoteModel

# Register your models here.
admin.site.register(NoteModel)
admin.site.register(FleetingNoteModel)

