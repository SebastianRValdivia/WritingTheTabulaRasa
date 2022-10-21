from django.db import models
from django.urls import reverse

from config.fields_default_values import (CHARFIELD_LONG)
# Create your models here.
class EncyclopediaPageModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    epigraph = models.TextField(
        blank=False,
        null=False,
    )
    content = models.TextField(
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    

    class Meta:
        verbose_name = "Encyclopedia Page"
        verbose_name_plural = "Encyclopedia Pages"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("EncyclopediaPageModel_detail", kwargs={"pk": self.pk})

# TODO: Modification