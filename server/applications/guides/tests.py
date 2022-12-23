from django.test import TestCase
from django.urls import reverse

from applications.guides.models import GuideModel

# Create your tests here.
class GuideLiteTests(TestCase):

    TITLE_EXAMPLE = "Title"
    DESCRIPTION_EXAMPLE = "Description"

    def setUp(self):
        GuideModel.objects.create(
            title=self.TITLE_EXAMPLE,
            description=self.DESCRIPTION_EXAMPLE,
        )

    def test_list_use_correct_template(self):
        response = self.client.get(reverse("guide_list"))

        self.assertTemplateUsed(response, "guides/guide_list.html")

    def test_can_preview_list_of_guides(self):
        title_2 = "Title 2"
        description_2 = "Description 2"
        GuideModel.objects.create(
            title=title_2,
            description=description_2,
        )
        response = self.client.get(reverse("guide_list"))
        html = response.content.decode()

        self.assertIn(self.TITLE_EXAMPLE, html)
        self.assertIn(title_2, html)

    def test_item_of_guide_list_has_link_to_detail(self):
        response = self.client.get(reverse("guide_list"))
        html = response.content.decode()

        a_tag = f'<a href="/lite/guides/{self.TITLE_EXAMPLE.lower()}/">{self.TITLE_EXAMPLE}</a>'
        self.assertIn(a_tag, html)




