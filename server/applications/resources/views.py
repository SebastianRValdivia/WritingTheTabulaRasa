from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.resources.models import ReferenceModel
from applications.resources.serializers import ReferenceSerializer

# Create your views here.
class ReferenceViewSet(ModelViewSet):

    queryset = ReferenceModel.objects.all()
    serializer_class = ReferenceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
