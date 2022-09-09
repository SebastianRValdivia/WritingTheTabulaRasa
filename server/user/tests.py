from rest_framework.test import APITestCase, URLPatternsTestCase 
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.urls import include, path, reverse

# Create your tests here.
class UserTests(APITestCase, URLPatternsTestCase):
  urlpatterns = [
    path("api/v1/users/", include("user.api_urls"))
  ]
  
  def test_retrieve_user_data(self):
    User.objects.create_user("username", "mail@mail.com") # Create user
    url = reverse("user-data", kwargs={"pk": 1})
    response = self.client.get(url, format="json") # Get user data
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, {"email": "mail@mail.com", "username": "username"})

  def test_retrieve_user_token(self):
    User.objects.create_user(username="username", password="password") # Create user
    url = reverse("obtain-token")
    data = {"username": "username", "password": "password"}
    response = self.client.post(url, data, format="json") # Get token
    self.assertEqual(response.status_code, 200)
    token = Token.objects.values().get(user__username="username")
    self.assertEqual(response.data["token"], token["key"]) # Assert if correct token

