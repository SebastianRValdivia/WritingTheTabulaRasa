from django.db import models

# Create your models here.
class MetadataModel(models.Model):

    content = models.JSONField(
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = 'Metadata'
        verbose_name_plural = "Metadata"

    def __str__(self):
        return self.id
