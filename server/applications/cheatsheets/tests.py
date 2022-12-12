from django.test import TestCase
from django.urls import reverse
from django.db import IntegrityError

from applications.cheatsheets.models import SheetModel, CheatModel

# Create your tests here.
class CheatsheetsLiteTests(TestCase):

    TITLE = "algebra"
    DESCRIPTION = "Algebra cheatsheet"

    def setUp(self):
        self.first_sheet = SheetModel.objects.create(
            title=self.TITLE,
            description=self.DESCRIPTION
        )

    def test_cant_create_two_sheets_with_same_title(self):
        with self.assertRaises(IntegrityError) as context:
            SheetModel.objects.create(title=self.TITLE) # Same object as setUp

        self.assertTrue('UNIQUE constraint failed' in str(context.exception))

    def test_sheet_list_use_correct_template(self):
        response = self.client.get(reverse("sheet_list"))
        # Check it uses sheet_list instead of sheetmodel_list or other
        self.assertTemplateUsed(response, "cheatsheets/sheet_list.html")

    def test_sheet_detail_use_correct_template(self):
        response = self.client.get(reverse(
            "sheet_detail",
            kwargs={'url': self.TITLE}
        ))
        # Check it uses sheet_detail instead of sheetmodel_detail or other
        self.assertTemplateUsed(response, "cheatsheets/sheet_detail.html")

    def test_sheet_list_shows_a_list_of_sheets(self):
        second_obj = "python"
        SheetModel.objects.create(title=second_obj) # Creates anoter
        response = self.client.get(reverse("sheet_list"))
        html = response.content.decode()
        self.assertIn(self.TITLE, html)
        self.assertIn(second_obj, html)

    def test_sheet_detail_shows_title(self):
        response = self.client.get(reverse(
            "sheet_detail",
            kwargs={'url': self.TITLE}
        ))
        html = response.content.decode()
        self.assertIn(self.TITLE, html)

    def test_renders_cheat_markdown(self):
        cheat_title = "Cheat Title"
        cheat_content = "## h2 title"
        CheatModel.objects.create(
            title=cheat_title,
            content=cheat_content,
            sheet=self.first_sheet,
        )
        response = self.client.get(reverse(
            "sheet_detail",
            kwargs={'url': self.TITLE},
        ))
        html = response.content.decode()
        self.assertContains(response, "<h2>h2 title</h2>")











