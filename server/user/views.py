from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet

from user.models import UserPreferences
from user.serializers import UserPreferencesSerializer
from user.serializers import UserSerializer

# Create your views here.
class RetrieveUserDataView(ListAPIView):
    """
    User data View
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ["username", "id"]

class UserPreferencesViewSet(ModelViewSet):

    queryset = UserPreferences.objects.all()
    serializer_class = UserPreferencesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["owner__id"]
