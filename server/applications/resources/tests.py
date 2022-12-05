from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import path, include, reverse
from django.contrib.auth.models import User
import tempfile
from PIL import Image

# Create your tests here.
class ResourcesAPITests(APITestCase):
    urlpatterns = [
        path("api/v1/resources/", include("applications.resources.api_urls"))
    ]

    def setUp(self):
        # Create superuser with id=1
        self.user = User.objects.create_user("admin", "mail@mail.com", "password")
        self.client.force_authenticate(user=self.user)

    def mock_image(self):
        self.image_mock = tempfile.NamedTemporaryFile(suffix='.png')
        image = Image.new('RGB', (1, 1))
        image.save(self.image_mock.name)

    def test_can_upload_image(self):
        self.mock_image()
        url = reverse("images-list")
        data = {
            "title": "image title",
            "caption": "image caption",
            "file": self.image_mock,
        }

        request = self.client.post(url, data, format="multipart")
        self.assertEqual(request.status_code, 201)
