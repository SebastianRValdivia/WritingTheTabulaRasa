from django.test import TestCase
from django.urls import path, include, reverse

# Create your tests here.
class LiteTests(TestCase):
    urlpatterns = [
        path("lite/", include("lite.urls"))
    ]

    def test_url_to_lite_shows_index_page(self):
        url = reverse("index")
        response = self.client.get(url)
        self.assertTemplateUsed(response, "lite/index.html")


