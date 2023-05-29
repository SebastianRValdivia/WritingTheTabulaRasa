from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from constance import settings as constance_settings

class SettingsAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        settings = constance_settings.CONFIG
        return Response(settings)

