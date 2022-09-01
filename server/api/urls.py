# from django.urls import path, include
from django.urls import path, include

 
urlpatterns = [
    path('user/', include('user.api_urls'))
]
