from django.db import models
from config.fields_default_values import (CHARFIELD_LONG)

# Create your models here.
class ResourceModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)
    observations = models.TextField()

    class Meta:
        verbose_name = "Resource"
        verbose_name_plural = "Resources"

    def __str__(self):
        return self.title


