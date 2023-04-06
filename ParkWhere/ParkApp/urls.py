from django.urls import path

from . import views

app_name = 'ParkApp'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('testAPIcall/', views.testAPIcall, name='testAPIcall'),
    path('getCarpark/', views.getCarpark, name='getCarpark'),
    path('postCarpark/', views.postCarkpark, name='postCarpark'),
    path('putCarpark', views.putCarpark, name='putCarpark'),
    path('getUser/', views.getUser, name='getUser'),
    path('postUser/', views.postUser, name='postUser'),
    path('putUser/', views.putUser, name='putUser')
]