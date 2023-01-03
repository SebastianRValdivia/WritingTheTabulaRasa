from django.contrib import admin

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel
)

# Register your models here.
admin.site.register(QuizzModel)
admin.site.register(QuizzFormulationQuestionModel)
