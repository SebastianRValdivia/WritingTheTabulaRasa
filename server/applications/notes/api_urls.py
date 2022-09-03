from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.notes.views import NoteViewSet

router = DefaultRouter()
router.register('', NoteViewSet, basename="notes")

urlpatterns = [
    path('', include(router.urls))
]