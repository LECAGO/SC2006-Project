from rest_framework import serializers
from .models import Carpark, User

class CarparkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Carpark
        fields=('carpark_id', 'address', 'coordinates' ,'lots_available', 'total_lots', 'lot_type', 'agency', 'parking_system', 'short_term_parking', 'free_parking', 'night_parking', 'apitofetch')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('user_id', 'username', 'password', 'favourites', 'blacklist')