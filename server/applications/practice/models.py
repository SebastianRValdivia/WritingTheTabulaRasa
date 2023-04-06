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

class UserAssignedPracticeRoutineModel(models.Model):
    """ Model to assign user to a routine
    """

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    routine = models.ForeignKey(
        "practice.PracticeRoutineModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class PracticeCompletionModel(models.Model):
    """ Model to track user completion of routines 
    TODO: Add notes field
    """

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    routine = models.ForeignKey(
        "practice.PracticeRoutineModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

