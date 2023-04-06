from django.contrib import admin

from applications.practice.models import (
    PracticeRoutineModel,
    UserAssignedPracticeRoutineModel,
    PracticeCompletionModel,
)
# Register your models here.
admin.site.register(PracticeRoutineModel)
admin.site.register(UserAssignedPracticeRoutineModel)
admin.site.register(PracticeCompletionModel)
