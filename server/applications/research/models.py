from django.db import models

from config.fields_default_values import (
    CHARFIELD_LONG
)

# Create your models here.
class ResearchProcessModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)
    description = models.TextField()
    conclusion = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Research"
        verbose_name_plural = "Researches"

    def __str__(self):
        return self.title


# class ResearchResourceModel(models.Model):
# 
#     # TODO Connection to resource app
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
# 
#     class Meta:
#         verbose_name = "Research resource"
#         verbose_name_plural = "Research resources"
