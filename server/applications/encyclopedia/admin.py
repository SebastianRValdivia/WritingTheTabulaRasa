from django.contrib import admin

from applications.encyclopedia.models import (
    EncyclopediaPageModel,
    EncyclopediaCardModel,
)

# Register your models here.
admin.site.register(EncyclopediaPageModel)
admin.site.register(EncyclopediaCardModel)
