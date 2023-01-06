from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

from config.fields_default_values import CHARFIELD_LONG

# Create your models here.
class EssayModel(models.Model):

    title = models.CharField(
        max_length=CHARFIELD_LONG,
        blank=True,
        null=True,
        unique=True,
    )
    url = models.SlugField(
        max_length=CHARFIELD_LONG,
        unique=True,
        blank=True,
        null=False
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )
    category = models.ForeignKey(
        "metadata.CategoryModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    metadata = models.OneToOneField(
        "metadata.MetadataModel",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Essay"
        verbose_name_plural = "Essays"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.url = slugify(self.title)
        super(EssayModel, self).save(*args, **kwargs)
