from rest_framework.test import APITestCase, URLPatternsTestCase 
from django.contrib.auth.models import User
from django.urls import include, path, reverse
from applications.metadata.models import MetadataModel

# Create your tests here.
class MetadataAPITests(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path("api/v1/metadata/", include("applications.metadata.api_urls")),
    ]

    def setUp(self):
        self.user = User.objects.create_user(
            "admin", "mail@mail.com", "password"
        )
        self.client.force_authenticate(user=self.user)


    def test_can_post_new_metadata(self):
        data = {"content": "{'category': 'category-1'}"}
        request = self.client.post(
            reverse("metadata-list"),
            data,
            format="json"
        )
        self.assertEqual(request.data["content"], data["content"])
        self.assertTrue(request.status_code == 201)
    
    def test_can_get_metadata_detail(self):
        content = "{'category': 'category-1'}"
        MetadataModel.objects.create(
            content=content,
        )
        request = self.client.get(
            reverse("metadata-detail", kwargs={"pk": 1}),
        )

        self.assertTrue(request.status_code == 200)
        self.assertEqual(request.data["content"], content)

    def test_can_get_list_of_metadata(self):
        content = "{'category': 'category-1'}"
        MetadataModel.objects.create(
            content=content,
        )
        request = self.client.get(
            reverse("metadata-list"),
        )

        self.assertTrue(request.status_code == 200)
        self.assertEqual(len(request.data["results"]), 1)




