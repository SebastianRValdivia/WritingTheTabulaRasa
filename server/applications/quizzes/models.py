from django.db import models
from config.fields_default_values import CHARFIELD_LONG 

# Create your models here.
class QuizzModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    category = models.ForeignKey(
        "metadata.CategoryModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quizz"
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return self.title

class QuizzQuestionModel(models.Model):

    class QuestionTypeChoices(models.IntegerChoices):
        FORMULATION = 0, "Formulation" 
        CHOICE = 1, "Choice"
        JOIN = 2, "Join"
        LIST = 3, "List"

    quizz = models.ForeignKey(
        "quizzes.QuizzModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    size = models.IntegerField(
        choices=QuestionTypeChoices.choices,
        default=QuestionTypeChoices.FORMULATION,
        blank=False,
        null=False,
    )
    question = models.TextField(
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quizz question"
        verbose_name_plural = "Quizz questions"

    def __str__(self):
        return str(self.quizz.id) + self.question

# Formulation question
class QuizzFormulationQuestionModel(models.Model):

    question = models.ForeignKey(
        "quizzes.QuizzQuestionModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    response = models.TextField(
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quizz formulation question"
        verbose_name_plural = "Quizz formulation questions"

    def __str__(self):
        return self.question


class QuizzChoiceQuestionModel(models.Model):

    text = models.CharField( # The text to present
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    correct = models.BooleanField( # To determine if is a correct item
        blank=False,
        null=False,
    )
    question = models.ForeignKey(
        "quizzes.QuizzQuestionModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Question quizz choice"
        verbose_name_plural = "Question quizz choices"

    def __str__(self):
        return self.text

# Order the list question
class QuizzListItemQuestionModel(models.Model):

    question = models.ForeignKey(
        "quizzes.QuizzQuestionModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    order = models.IntegerField(
        blank=False,
        null=False,
    )
    content = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quizz list item question"
        verbose_name_plural = "Quizz list item questions"

    def __str__(self):
        return str(self.question.id) + str(self.order)

class QuizzJoinElementQuestionModel(models.Model):

    question = models.ForeignKey(
        "quizzes.QuizzQuestionModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    content = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    related = models.ManyToManyField(
        "self",
        blank=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quizz join question element"
        verbose_name_plural = "Quizz join element questions element"

    def __str__(self):
        return str(self.question.id) + self.content
