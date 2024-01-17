from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from config.fields_default_values import (CHARFIELD_LONG)

# Create your models here.
class CourseModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    students = models.ManyToManyField("courses.LectureModel")


class LectureModel(models.Model):


    course = models.ForeignKey(
        CourseModel,
        on_delete=models.SET_NULL,
        null=True,
    )
    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=False,
        null=False,
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(
        blank=False,
        null=False,
    )
    video = models.FileField(
        upload_to="lectures_videos",
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['mp4',])]
    )
    thumbnail = models.ImageField(
        upload_to="lectures_videos/thumbnails/",
        blank=True,
        null=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Lecture"
        verbose_name_plural = "Lectures"

    def __str__(self):
        return self.title
