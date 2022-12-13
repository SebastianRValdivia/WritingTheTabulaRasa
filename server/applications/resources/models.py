from django.db import models
from config.fields_default_values import (CHARFIELD_LONG)

# Create your models here.
class ReferenceModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)
    observations = models.TextField()

    class Meta:
        verbose_name = "Reference"
        verbose_name_plural = "References"

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
        return self.caption



