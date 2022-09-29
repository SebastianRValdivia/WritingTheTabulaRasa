from django.db import models
from django.urls import reverse
from config.fields_default_values import (CHARFIELD_LONG)
from django.contrib.auth.models import User

# Create your models here.
class GoalModel(models.Model):
    """ Long term goal """

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    result = models.TextField()
    finish = models.DateTimeField(
        blank=False,
        null=False,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Goal"
        verbose_name_plural = "Goals"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("GoalModel_detail", kwargs={"pk": self.pk})

class ObjectiveModel(models.Model):
    """ Daily objective """

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    goal = models.ForeignKey(
        GoalModel,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    date = models.DateField(
        blank=False,
        null=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Objective"
        verbose_name_plural = "Objectives"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Objective_detail", kwargs={"pk": self.pk})
