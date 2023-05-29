from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from constance import settings as constance_settings


from .serializers import SettingsSerializer

class SettingsAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        settings = constance_settings.CONFIG
        print(settings)
        return Response(settings)

