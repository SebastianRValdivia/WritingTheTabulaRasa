from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.generics import ListAPIView

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
    filterset_fields = ["username"]

class UserPreferencesViewSet(viewsets.ViewSet):

    model = UserPreferences
    serializer = UserPreferencesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
