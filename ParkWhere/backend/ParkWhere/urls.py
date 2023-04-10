from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('ParkApp/', include('ParkApp.urls')),
    path('admin/', admin.site.urls),
]