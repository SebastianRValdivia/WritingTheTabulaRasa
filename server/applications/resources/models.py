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


