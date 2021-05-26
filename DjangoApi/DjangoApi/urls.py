"""DjangoApi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import api.views as api_views 
from api import consumers
from django.urls import re_path


urlpatterns = [
    path('api/login', api_views.login),
    path('api/register', api_views.register),
    path('api/tabs', api_views.tabs),
    path('api/tags', api_views.tags),
    path('search',api_views.search),
    path('admin/', admin.site.urls),
    path("api/sesion", api_views.session), 
    path("api/buttons", api_views.buttons), 
    path("api/changepassword", api_views.changepassword)
]

websocket_urlpatterns = [
    re_path('api/socket', consumers.ChatConsumer.as_asgi()),
]