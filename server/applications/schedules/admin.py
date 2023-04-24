from django.contrib import admin

from applications.schedules.models import (
    ObjectiveModel,
    GoalModel,
    UserTimeTableModel,
    UserHourModel,
)


# Register your models here.
admin.site.register(ObjectiveModel)
admin.site.register(GoalModel)
admin.site.register(UserTimeTableModel)
admin.site.register(UserHourModel)

