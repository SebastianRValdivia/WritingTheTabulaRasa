from django.contrib import admin

from applications.resources.models import ReferenceModel, ImageModel

# Register your models here.
admin.site.register(ReferenceModel)
admin.site.register(ImageModel)
