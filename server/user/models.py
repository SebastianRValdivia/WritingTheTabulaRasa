from django.db import models
from django.contrib.auth.models import User

from config.fields_default_values import (CHARFIELD_SHORT)

# Create your models here.

class UserPreferences(models.Model):

    class ThemeChoices(models.TextChoices):
        ## Themes Choice
        DARK = "DARK", "Dark"
        LIGHT = "LIGHT", "Light"

    owner = models.OneToOneField( 
        User,  
        on_delete=models.CASCADE
    )
    lang = models.CharField(max_length=CHARFIELD_SHORT, default="en-US")
    theme = models.CharField(
        max_length=CHARFIELD_SHORT,
        choices=ThemeChoices.choices,
        default=ThemeChoices.LIGHT
    )

  
    
    class Meta:
        verbose_name = "UserPreference"
        verbose_name_plural = "UserPreferences"

    def __str__(self):
        return self.owner.username

