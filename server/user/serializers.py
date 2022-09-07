from rest_framework import serializers
from django.contrib.auth.models import User

from user.models import UserPreferences

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', )

class UserPreferencesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserPreferences
        fields = "__all__"
