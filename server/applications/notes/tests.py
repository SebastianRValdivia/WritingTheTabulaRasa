from rest_framework.test import APITestCase, URLPatternsTestCase
from django.urls import path, include, reverse
from applications.notes.models import NoteModel
from django.contrib.auth.models import User

# Create your tests here.
class NotesTests(APITestCase, URLPatternsTestCase):
  urlpatterns = [
    path("api/v1/notes/", include("applications.notes.api_urls"))
  ]

  def setUp(self):
    # Create superuser with id=1
    self.user = User.objects.create_user("admin", "mail@mail.com", "password")
    self.client.force_authenticate(user=self.user)
