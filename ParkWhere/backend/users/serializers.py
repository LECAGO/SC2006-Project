from rest_framework import serializers
from users.models import CustomUser
from ParkApp.serializers import CarparkSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    favorite = CarparkSerializer(many=True, read_only=True)
    blacklist = CarparkSerializer(many=True, read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'favorite', 'blacklist')