from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.views.generic import ListView, DetailView

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
    filterset_fields = ["url"]

class CheatViewSet(ModelViewSet):

    queryset = CheatModel.objects.all()
    serializer_class = CheatSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["sheet"]


class SheetLiteListView(ListView):

    model = SheetModel
    context_object_name = "sheets"
    template_name = "cheatsheets/sheet_list.html"

class SheetLiteDetailView(DetailView):

    model = SheetModel
    context_object_name = 'sheet'
    template_name = "cheatsheets/sheet_detail.html"
    slug_url_kwarg = "url"
    slug_field = "url"
