from django.contrib import admin
from applications.cheatsheets.models import SheetModel, CheatModel

# Register your models here.
admin.site.register(SheetModel)
admin.site.register(CheatModel)