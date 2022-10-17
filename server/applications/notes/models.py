from django.db import models
from django.urls import reverse
from config.fields_default_values import (CHARFIELD_LONG)
from django.contrib.auth.models import User

from applications.resources.models import ReferenceModel

# Create your models here.
class NoteModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=True,
        null=True,
        unique=True,
    )
    parent = models.ForeignKey(
        "self",
        models.SET_NULL,
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    content = models.TextField()
    identifier = models.IntegerField(
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = "Notes"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('NoteModel_detail', kwargs={'pk': self.pk})


class FleetingNoteModel(models.Model):

    content = models.TextField()
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Fleeting Note"
        verbose_name_plural = "Fleeting Notes"

    def __str__(self):
        return str(self.pk) + ": " + self.content

    def get_absolute_url(self):
        return reverse("FleetingNoteModel_detail", kwargs={"pk": self.pk})

class LiteraryNoteModel(models.Model):

    
    content = models.TextField()
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    reference = models.ForeignKey(
        ReferenceModel,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Fleeting Note"
        verbose_name_plural = "Fleeting Notes"

    def __str__(self):
        return self.reference__title

    def get_absolute_url(self):
        return reverse("FleetingNoteModel_detail", kwargs={"pk": self.pk})
