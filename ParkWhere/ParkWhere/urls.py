from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('ParkApp/', include('ParkApp.urls')),
    path('admin/', admin.site.urls),
]