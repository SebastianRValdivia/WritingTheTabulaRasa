from django.contrib import admin

from applications.tasks.models import TaskModel
# Register your models here.
admin.site.register(TaskModel)
