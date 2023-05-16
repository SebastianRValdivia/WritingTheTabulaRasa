from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.contrib.auth.models import User

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
    url = models.SlugField(
        max_length=CHARFIELD_LONG,
        unique=True,
        blank=True,
        null=False
    )
    image = models.ForeignKey(
        "resources.ImageModel",
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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    

    class Meta:
        verbose_name = "Encyclopedia Page"
        verbose_name_plural = "Encyclopedia Pages"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("EncyclopediaPageModel_detail", kwargs={"pk": self.pk})

    
    def save(self, *args, **kwargs):
        if not self.id:
            self.url = slugify(self.title)
        super(EncyclopediaPageModel, self).save(*args, **kwargs)

class EncyclopediaCardModel(models.Model):

    content = models.TextField(
        blank=False,
        null=False,
    )
    # pg is short for page, to avoid errors with django rest pagination system
    pg = models.OneToOneField( 
        "encyclopedia.EncyclopediaPageModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Encyclopedia Card"
        verbose_name_plural = "Encyclopedia Cards"

    def __str__(self):
        return self.pg.title + " Card"

class EncyclopediaDiscussionPostModel(models.Model):

    content = models.TextField(
        blank=False,
        null=False,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        blank=False,
        null=True,
    )
    pg = models.ForeignKey( 
        "encyclopedia.EncyclopediaPageModel",
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Encyclopedia discussion post"
        verbose_name_plural = "Encyclopedia discussion posts"

    def __str__(self):
        return str(self.pg.id) + self.content

# TODO: Modification
