from django.contrib import admin

from applications.resources.models import (
    LearningResourceModel,
    ImageModel
)
# Register your models here.
admin.site.register(LearningResourceModel)
admin.site.register(ImageModel)
