from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

from config.fields_default_values import (CHARFIELD_LONG)

# Create your models here.
class TaskModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)
    require = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    

    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("TaskModel_detail", kwargs={"pk": self.pk})


