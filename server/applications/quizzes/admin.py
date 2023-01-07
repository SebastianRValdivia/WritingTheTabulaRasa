from django.contrib import admin

from applications.quizzes.models import (
    QuizzModel,
    QuizzFormulationQuestionModel,
    QuizzChoicesQuestionModel,
    QuizzChoiceModel,
    QuizzOrderListQuestionModel,
    QuizzListItemModel,
    QuizzJoinQuestionModel,
    QuizzJoinElementModel,
)

# Register your models here.
admin.site.register(QuizzModel)
admin.site.register(QuizzFormulationQuestionModel)
admin.site.register(QuizzChoicesQuestionModel)
admin.site.register(QuizzChoiceModel)
admin.site.register(QuizzOrderListQuestionModel)
admin.site.register(QuizzListItemModel)
admin.site.register(QuizzJoinQuestionModel)
admin.site.register(QuizzJoinElementModel)
