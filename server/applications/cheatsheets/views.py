from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.views.generic import ListView

from applications.cheatsheets.models import SheetModel, CheatModel
from applications.cheatsheets.serializers import (
    SheetSerializer,
    CheatSerializer
)

# Create your views here.
class SheetViewSet(ModelViewSet):

    queryset = SheetModel.objects.all()
    serializer_class = SheetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CheatViewSet(ModelViewSet):

    queryset = CheatModel.objects.all()
    serializer_class = CheatSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["sheet"]


class SheetLiteListView(ListView):

    model = SheetModel
    context_object_name = 'sheets'
