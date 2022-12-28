from django.db import models
from config.fields_default_values import CHARFIELD_LONG

# Create your models here.
class CategoryModel(models.Model):

    name = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class MetadataModel(models.Model):

    content = models.JSONField(
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = 'Metadata'
        verbose_name_plural = "Metadata"

    def __str__(self):
        return self.id
