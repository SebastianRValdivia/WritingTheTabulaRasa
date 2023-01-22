from django.urls import path, include
from rest_framework.routers import DefaultRouter

from applications.quotes.views import QuoteViewSet

router = DefaultRouter()
router.register("", QuoteViewSet, basename="quotes")

urlpatterns = [
    path("", include(router.urls))
]
