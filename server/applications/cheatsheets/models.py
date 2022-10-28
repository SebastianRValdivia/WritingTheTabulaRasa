from django.db import models
from django.utils.text import slugify

from config.fields_default_values import (CHARFIELD_LONG)

# Create your models here.
class SheetModel(models.Model):
    
    title = models.CharField(max_length=CHARFIELD_LONG)
    url = models.SlugField(
        max_length=CHARFIELD_LONG,
        unique=True,
        blank=True,
        null=False
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sheet"
        verbose_name_plural = "Sheets"

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.url = slugify(self.title)
        super(SheetModel, self).save(*args, **kwargs)


class CheatModel(models.Model):
    
    class SizeChoices(models.IntegerChoices):
        AUTO = 0, "Auto"
        SIMPLE = 1, "Simple"
        DOUBLE = 2, "Double"
        FULL = 3, "Full"


    title = models.CharField(max_length=CHARFIELD_LONG)
    content = models.TextField()
    sheet = models.ForeignKey(
        SheetModel,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )
    size = models.IntegerField(
        choices=SizeChoices.choices,
        default=SizeChoices.AUTO,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Cheat"
        verbose_name_plural = "Cheats"

    def __str__(self):
        return self.sheet.title + ": " + self.title