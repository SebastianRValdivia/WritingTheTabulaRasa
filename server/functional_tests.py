import os
import unittest
from selenium import webdriver
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.common.by import By


class FirstUserExperience(unittest.TestCase):

    def setUp(self):
        """ Before each test do: """
        opts = FirefoxOptions()
        opts.add_argument("--headless")
        self.browser = webdriver.Firefox(options=opts)

    def tearDown(self):
        """ After each test do: """
        self.browser.quit()

    def test_home_title_is_tabula_rasa(self):
        """ User enters the website and sees tabula rasa in the title """
        url = "http://localhost:8000/lite/"
        self.browser.get(url=url)

        self.assertIn('Tabula Rasa', self.browser.title)
    
    def test_navbar_contains_link_to_home(self):
        """ User sees the navigation bar and click on index to go to index page"""
        url = "http://localhost:8000/lite/"
        self.browser.get(url=url)
        self.browser.find_element(By.LINK_TEXT, "Index").click()

        self.assertEqual(self.browser.current_url, url)

class WebAppFunctionalTests(unittest.TestCase):

    def setUp(self):
        """ Before each test do: """
        opts = FirefoxOptions()
        opts.add_argument("--headless")
        self.browser = webdriver.Firefox(options=opts)

    def test_user_can_view_cheatsheets(self):
        # User enters the site
        root_url = "http://localhost:8000/app/#/"
        cheatsheets_url = f"{root_url}cheatsheets/"
        self.browser.get(url=root_url)
        self.assertEqual(self.browser.current_url, root_url)

        self.browser.get(url=cheatsheets_url)
        self.assertEqual(self.browser.current_url, f"{root_url}cheatsheets/")


if __name__ == '__main__':
    unittest.main()
