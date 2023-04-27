from django.db import models
from django.urls import reverse
from config.fields_default_values import (CHARFIELD_LONG)
from django.contrib.auth.models import User

# Create your models here.
class UserTimeTableModel(models.Model):
    """
    User time table model.
    The status represent if its active or not (can be using only 1)
    """

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    status = models.BooleanField(
        default=False,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Time table"
        verbose_name_plural = "Time tables"

    def __str__(self):
        title = "Table from " + self.owner.username + " id: " + str(self.id)
        return title

class UserHourModel(models.Model):

    class DaysChoices(models.TextChoices):
        MONDAY = "MON", "Monday"
        TUESDAY = "TUE", "Tuesday"
        WEDNESDAY = "WED", "Wednesday"
        THURSDAY = "THU", "Thursday"
        FRIDAY = "FRI", "Friday"
        SATURDAY = "SAT", "Saturday"
        SUNDAY = "SUN", "Sunday"

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    table = models.ForeignKey(
        "schedules.UserTimeTableModel",
        on_delete=models.CASCADE,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    day = models.CharField(
        max_length=3,
        choices=DaysChoices.choices,
        default=DaysChoices.MONDAY,
        blank=False,
        null=False,
    )
    time = models.TimeField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hour"
        verbose_name_plural = "Hours"

    def __str__(self):
        return self.title


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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

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
        "schedules.GoalModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    date = models.DateField(
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Objective"
        verbose_name_plural = "Objectives"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Objective_detail", kwargs={"pk": self.pk})
