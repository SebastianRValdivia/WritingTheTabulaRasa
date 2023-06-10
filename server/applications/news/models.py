from django.db import models

from config.fields_default_values import CHARFIELD_SHORT

# Create your models here.
class NewModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_SHORT,
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
        verbose_name = "New"
        verbose_name_plural = "News"

    def __str__(self):
        return self.title


