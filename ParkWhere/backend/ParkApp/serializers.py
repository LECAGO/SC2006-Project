from rest_framework import serializers
from .models import Carpark

class CarparkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Carpark
        fields=('carpark_id', 
                'address', 
                'coordinates',
                'lots_available',
                'total_lots', 
                'lot_type', 
                'agency', 
                'parking_system', 
                'short_term_parking', 
                'free_parking', 
                'night_parking', 
                'apitofetch',
                )

class SimpleCarparkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Carpark
        fields=('carpark_id',
                'lot_type',
                )