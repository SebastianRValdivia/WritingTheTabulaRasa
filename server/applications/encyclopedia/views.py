from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from applications.encyclopedia.models import (
    EncyclopediaPageModel,
    EncyclopediaCardModel,
    EncyclopediaDiscussionPostModel,
)
from applications.encyclopedia.serializers import (
    EncyclopediaPageSerializer,
    EncyclopediaCardSerializer,
    EncyclopediaDiscussionPostSerializer,
)

# Create your views here.

class EncyclopediaPageViewSet(ModelViewSet):
    
    queryset = EncyclopediaPageModel.objects.all()
    serializer_class = EncyclopediaPageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["url"]


class EncyclopediaCardViewSet(ModelViewSet):

    queryset = EncyclopediaCardModel.objects.all()
    serializer_class = EncyclopediaCardSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["pg"]

class EncyclopediaDiscussionPostViewSet(ModelViewSet):

    queryset = EncyclopediaDiscussionPostModel.objects.all().order_by("id")
    serializer_class = EncyclopediaDiscussionPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["pg"]

    def perform_create(self, serializer):
        request = serializer.context["request"]
        serializer.save(owner=request.user)
