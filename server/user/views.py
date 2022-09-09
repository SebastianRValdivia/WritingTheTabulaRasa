from rest_framework.generics import RetrieveAPIView
from user.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions

from user.models import UserPreferences
from user.serializers import UserPreferencesSerializer

# Create your views here.
class RetrieveUserDataView(RetrieveAPIView):
    """
    User data View
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserPreferencesViewSet(viewsets.ViewSet):

    model = UserPreferences
    serializer = UserPreferencesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
