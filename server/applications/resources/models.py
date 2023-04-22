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
    autor = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=True,
        null=True,
    )
    description = models.TextField(
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )


    class Meta:
        verbose_name = "Learning resource reference"
        verbose_name_plural = "Learning resource references"

    def __str__(self):
        return self.title

class ImageModel(models.Model):

    caption = models.TextField(
        blank=True,
        null=True,
    )
    file = models.ImageField(
        upload_to="resources/images/",
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"

    def __str__(self):
        if self.caption:
            return self.caption
        else:
            return self.id



