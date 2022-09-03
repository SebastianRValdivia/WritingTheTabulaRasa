# from django.urls import path, include
from django.urls import path, include

 
urlpatterns = [
    path('users/', include('user.api_urls')),
    path('notes/', include('applications.notes.api_urls'))
]
