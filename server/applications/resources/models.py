from django.db import models
from config.fields_default_values import (CHARFIELD_LONG)
from django.contrib.auth.models import User

# Create your models here.
class LearningResourceModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    description = models.TextField(
        blank=True,
        null=True,
    )
    category = models.OneToOneField(
        "metadata.CategoryModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    metadata = models.OneToOneField(
        "metadata.MetadataModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Learning resource reference"
        verbose_name_plural = "Learning resource references"

    def __str__(self):
        return self.title

class UserAssignedLearningResourceModel(models.Model):
    """
    Learning resources assigned to an user
    """
    owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    resources = models.ManyToManyField(
        "resources.LearningResourceModel",
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User assigned learning resource"
        verbose_name_plural = "User assigned learning resources"

    def __str__(self):
        return self.owner.username



