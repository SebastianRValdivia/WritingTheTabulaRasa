from django.contrib import admin

from applications.guides.models import GuideModel, StepModel

# Register your models here.
admin.site.register(GuideModel)
admin.site.register(StepModel)
