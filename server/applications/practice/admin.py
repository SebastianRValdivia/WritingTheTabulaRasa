from django.contrib import admin

from applications.practice.models import (
    PracticeRoutineModel,
    UserAssignedPracticeRoutineModel,
    PracticeCompletionModel,
    PracticeExerciseModel,
)
# Register your models here.
admin.site.register(PracticeRoutineModel)
admin.site.register(UserAssignedPracticeRoutineModel)
admin.site.register(PracticeCompletionModel)
admin.site.register(PracticeExerciseModel)
