from django.urls import path
from django.urls import include, path
from . import views

app_name = 'ParkApp'

urlpatterns = [
    path('users/', include('users.urls')),
    path('carpark/view/', views.getCarpark, name='getCarpark'),
    path('carpark/update/', views.updateCarpark, name='updateCarpark'),
    path('favorites/', views.FavoriteView.as_view(), name='FavoriteView'),
    path('blacklist/', views.BlacklistView.as_view(), name='BlacklistView'),
]