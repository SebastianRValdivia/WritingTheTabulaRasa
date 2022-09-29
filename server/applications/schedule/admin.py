from django.contrib import admin

from applications.schedule.models import ObjectiveModel, GoalModel

# Register your models here.
admin.site.register(ObjectiveModel)
admin.site.register(GoalModel)

