from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include
from user.views import RetriveUserDataView

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('data/<int:pk>/', RetriveUserDataView.as_view(), name="user-data"),
    path('obtain-token/', obtain_auth_token, name='obtain-token'),
]
