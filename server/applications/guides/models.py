from django.db import models
from django.utils.text import slugify

from config.fields_default_values import CHARFIELD_LONG

# Create your models here.
class GuideModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)
    url = models.SlugField(
        max_length=CHARFIELD_LONG,
        unique=True,
        blank=True,
        null=False
    )
    description = models.TextField(
        blank=True,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Guide"
        verbose_name_plural = "Guides"

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.url = slugify(self.title)
        super(SheetModel, self).save(*args, **kwargs)

class StepModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)
    content = models.TextField(
        blank=True,
        null=False,
    )
    guide = models.ForeignKey(
        GuideModel,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Step"
        verbose_name_plural = "Steps"

    def __str__(self):
        return self.title
