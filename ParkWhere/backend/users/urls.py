from django.urls import path
from users.views import CustomUserList, CustomUserDetail, getCurrentUser
from rest_framework.authtoken.views import obtain_auth_token
from users.views import RegisterView, LogoutView

urlpatterns = [
    path('list/', CustomUserList.as_view(), name='user-list'),
    path('<int:pk>/', CustomUserDetail.as_view(), name='user-detail'),
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('currentuser/', getCurrentUser, name='getCurrentUser')
]