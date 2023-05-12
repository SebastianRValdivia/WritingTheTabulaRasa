from django.db import models
from django.urls import reverse
from config.fields_default_values import (CHARFIELD_LONG)
from django.contrib.auth.models import User

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
        models.CASCADE,
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
    audio = models.FileField(
        upload_to="notes/audio/",
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

class NoteConnectionGroupModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    notes = models.ManyToManyField(
        "notes.NoteModel"
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


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

    content = models.TextField(
        blank=False,
        null=False,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    resource = models.ForeignKey(
        "resources.LearningResourceModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    position = models.IntegerField(
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Literary Note"
        verbose_name_plural = "Literary Notes"

    def __str__(self):
        return self.resource.title + "-position:" +str(self.position)
        
    def get_absolute_url(self):
        return reverse("FleetingNoteModel_detail", kwargs={"pk": self.pk})
