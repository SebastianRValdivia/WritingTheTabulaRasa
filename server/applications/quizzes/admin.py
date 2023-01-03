from django.contrib import admin

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel,
    QuizzChoicesQuestionModel,
    QuizzChoiceModel,
)

# Register your models here.
admin.site.register(QuizzModel)
admin.site.register(QuizzFormulationQuestionModel)
admin.site.register(QuizzChoicesQuestionModel)
admin.site.register(QuizzChoiceModel)
