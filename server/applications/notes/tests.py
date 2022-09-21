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

  def test_api_can_not_create_same_level_identifier(self):
    """ Test to check that api can't create 2 notes with parent 1 
    and same identifier
    """
    # Create parent and original 1-1 note
    NoteModel.objects.create(
      title="title",
      content="Example",
      identifier=1,
      parent=None,
      owner_id=1
    )
    NoteModel.objects.create(
      title="title 2",
      content="Example",
      identifier=1,
      parent_id=1,
      owner_id=1
    )
    # Tries to post request with identifier 1-1
    url = reverse("notes-list")
    data = {
      "title":"different title",
      "content":"different example",
      "identifier":1,
      "parent":1,
      "owner":1
    }
    request = self.client.post(url, data, format="json")
    self.assertEqual(request.status_code, 400)


