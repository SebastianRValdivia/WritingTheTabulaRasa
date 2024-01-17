from django.contrib import admin

from .models import CourseModel, LectureModel

# Register your models here.
admin.site.register(LectureModel)
admin.site.register(CourseModel)
