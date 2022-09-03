from django.db import models
from django.urls import reverse
from config.fields_default_values import (CHARFIELD_LONG)

# Create your models here.
class NoteModel(models.Model):

    title = models.CharField(max_length=CHARFIELD_LONG)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("NoteModel_detail", kwargs={"pk": self.pk})
