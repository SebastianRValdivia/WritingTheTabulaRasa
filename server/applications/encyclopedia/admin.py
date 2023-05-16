from django.contrib import admin

from applications.encyclopedia.models import (
    EncyclopediaPageModel,
    EncyclopediaCardModel,
    EncyclopediaDiscussionPostModel,
)

# Register your models here.
admin.site.register(EncyclopediaPageModel)
admin.site.register(EncyclopediaCardModel)
admin.site.register(EncyclopediaDiscussionPostModel)
