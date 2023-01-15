from django.contrib import admin

from applications.quizzes.models import (
    QuizzModel,
    QuizzQuestionModel,
    QuizzFormulationQuestionModel,
    QuizzListItemQuestionModel,
    QuizzJoinElementQuestionModel,
    QuizzChoiceQuestionModel,
)

# Register your models here.
admin.site.register(QuizzModel)
admin.site.register(QuizzQuestionModel)
admin.site.register(QuizzFormulationQuestionModel)
admin.site.register(QuizzListItemQuestionModel)
admin.site.register(QuizzJoinElementQuestionModel)
admin.site.register(QuizzChoiceQuestionModel)
