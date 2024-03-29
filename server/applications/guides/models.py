from django.db import models
from django.utils.text import slugify
from django.urls import reverse

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
    metadata = models.OneToOneField(
        "metadata.MetadataModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
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
        super(GuideModel, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("guide_detail", kwargs={"url": self.url})

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
    order = models.PositiveIntegerField(
        blank=False,
        null=False,
        default=1,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Step"
        verbose_name_plural = "Steps"

    def __str__(self):
        return self.title
