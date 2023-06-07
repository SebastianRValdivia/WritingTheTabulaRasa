from django.contrib import admin

from applications.resources.models import (
    LearningResourceModel,
    UserAssignedLearningResourceModel,
)
# Register your models here.
admin.site.register(LearningResourceModel)
admin.site.register(UserAssignedLearningResourceModel)
