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

class QuizzFormulationQuestionModel(models.Model):

    quizz = models.ForeignKey(
        "quizzes.QuizzModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    question = models.TextField(
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


# Multiple choice question model
# Each might ve several QuizzChoiceModel attached to it 
class QuizzChoicesQuestionModel(models.Model):

    quizz = models.ForeignKey(
        "quizzes.QuizzModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    question = models.TextField(
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quizz choice question"
        verbose_name_plural = "Quizz choice questions"

    def __str__(self):
        return self.question

class QuizzChoiceModel(models.Model):

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
        "quizzes.QuizzChoicesQuestionModel",
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


# TODO: list to order, joint related options
