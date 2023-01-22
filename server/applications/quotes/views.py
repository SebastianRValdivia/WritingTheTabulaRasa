from rest_framework import viewsets, permissions

from applications.quotes.models import QuoteModel
from applications.quotes.serializers import QuoteSerializer

# Create your views here.
class QuoteViewSet(viewsets.ModelViewSet):

    queryset = QuoteModel.objects.all().order_by("id")
    serializer_class = QuoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
