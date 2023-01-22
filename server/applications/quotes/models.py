from django.db import models

# Create your models here.
class QuoteModel(models.Model):

    content = models.TextField(
        blank=False,
        null=False
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Quote"
        verbose_name_plural = "Quotes"

    def __str__(self):
        return self.content


