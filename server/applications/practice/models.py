from django.db import models
from config.fields_default_values import CHARFIELD_LONG
from django.contrib.auth.models import User

# Create your models here.

class PracticeRoutineModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class PracticeCompletionModel(models.Model):

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    routine = models.ForeignKey(
        "practice.PracticeCompletionModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

