from rest_framework.generics import ListAPIView

from applications.news.models import NewModel
from applications.news.serializers import NewSerializer

# Create your views here.
class NewListView(ListAPIView):

    queryset = NewModel.objects.all().order_by("created")
    serializer_class = NewSerializer

