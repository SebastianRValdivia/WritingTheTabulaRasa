from django.db import models

# Create your models here.

class ImageModel(models.Model):

    caption = models.TextField(
        blank=True,
        null=True,
    )
    file = models.ImageField(
        upload_to="resources/images/",
        blank=False,
        null=False,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"

    def __str__(self):
        if self.caption:
            return self.caption
        else:
            return str(self.id)
