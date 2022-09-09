from django.urls import path, include
from user.views import RetrieveUserDataView, UserPreferencesViewSet 
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register("", UserPreferencesViewSet, basename="UserPreferences")

urlpatterns = [
    path("", include("django.contrib.auth.urls")),
    path("preferences/", include(router.urls)),
    path("data/<int:pk>/", RetrieveUserDataView.as_view(), name="user-data"),
    path("obtain-token/", obtain_auth_token, name="obtain-token"),
]
