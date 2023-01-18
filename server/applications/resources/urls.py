
from django.urls import path

from applications.resources.views import (
    LearningResourceLiteListView,
)

urlpatterns = [
    path(
        "learning-resource/list/",
        LearningResourceLiteListView.as_view(), 
        name="learning_resource_list",
    ),
]
