from django.db import models
from config.fields_default_values import CHARFIELD_LONG
from django.core.validators import MaxValueValidator
from django.contrib.auth.models import User

# Create your models here.

class PracticeRoutineModel(models.Model):
    """ Grouped practices exercises 
    """

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    description = models.TextField(
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Practice routine"
        verbose_name_plural = "Practice routines"

    def __str__(self):
        return self.title

class UserAssignedPracticeRoutineModel(models.Model):
    """ Model to assign user to a routine
    TODO: schedule field
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
    scheduled = models.DateTimeField(
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User routine"
        verbose_name_plural = "User routines"

    def __str__(self):
        return f"{self.owner.username} assigned to {self.routine.title}"

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

    class Meta:
        verbose_name = "Practice completion"
        verbose_name_plural = "Practice completions"

    def __str__(self):
        return (
            f"{self.owner.username} completed "
            f"{self.routine.title} at {str(self.created)}"
        )

class PracticeExerciseModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    content = models.TextField(
        blank=False,
        null=False,
    )
    difficulty = models.PositiveIntegerField(
        blank=True,
        null=True,
        validators=[MaxValueValidator(5)],
    )
    routine = models.ForeignKey(
        "practice.PracticeRoutineModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Practice exercise"
        verbose_name_plural = "Practice exercises"

    def __str__(self):
        return self.title
