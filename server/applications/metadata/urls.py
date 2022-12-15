from django.urls import path

from applications.metadata.views import MetadataLiteDetailView
urlpatterns = [
    path("<int:pk>/", MetadataLiteDetailView.as_view(), name="metadata")
]
