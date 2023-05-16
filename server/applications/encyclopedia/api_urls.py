from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.encyclopedia.views import (
    EncyclopediaPageViewSet,
    EncyclopediaCardViewSet,
    EncyclopediaDiscussionPostViewSet,
)

router = DefaultRouter()
router.register("pages", EncyclopediaPageViewSet, basename="encyclopedia pages")
router.register("cards", EncyclopediaCardViewSet, basename="encyclopedia cards")
router.register(
    "discussion-posts",
    EncyclopediaDiscussionPostViewSet,
    basename="encyclopedia-discussion-post",
)

urlpatterns = [
    path("", include(router.urls))
]
