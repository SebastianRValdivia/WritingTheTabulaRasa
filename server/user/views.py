from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from .serializers import UserSerializer
from django.contrib.auth.models import User

# Create your views here.
class RetriveUserDataView(RetrieveAPIView):
    """
    User data View
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
