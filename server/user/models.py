from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserPreferences(models.Model):

  user = models.ForeignKey(
      User,  
      on_delete=models.CASCADE
  )
  
    
  class Meta:
    verbose_name = "UserPreference"
    verbose_name_plural = "UserPreferences"

  def __str__(self):
    return self.user.username

  def get_absolute_url(self):
    return reverse("UserPreferences_detail", kwargs={"pk": self.pk})

