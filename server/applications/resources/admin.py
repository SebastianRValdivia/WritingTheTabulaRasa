from django.contrib import admin

from applications.resources.models import (
    LearningResourceModel,
    ImageModel,
    UserAssignedLearningResourceModel,
)
# Register your models here.
admin.site.register(LearningResourceModel)
admin.site.register(ImageModel)
admin.site.register(UserAssignedLearningResourceModel)
