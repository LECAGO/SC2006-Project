from .models import Carpark
from .serializers import CarparkSerializer, SimpleCarparkSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

@api_view(['GET'])
def getCarpark(request):
    try:
        filtered_search = Carpark.objects.filter(carpark_id=request.GET.get('q')).filter(lot_type="C").get()
        serializer = CarparkSerializer(filtered_search)
        return Response(serializer.data)
    except:
        return Response(status=404, data={"error":"Query not found, use 'q' parameter to search Carparks by ID number. E.g. ParkApp/GetCarpark/?q=A0046"})

@api_view(['PUT'])
def updateCarpark(request):
    for carpark_data in request.data:
        try:
            carpark = Carpark.objects.filter(carpark_id=carpark_data['carpark_id']).filter(lot_type=carpark_data['lot_type']).get()
            serializer = CarparkSerializer(carpark, data=carpark_data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except:
            try:    
                serializer = CarparkSerializer(data=carpark_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
            except:
                continue
    return Response(status=200, data={"success":"Data updated"})

class FavoriteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SimpleCarparkSerializer

    def get(self, request):
        favorites = request.user.favorite.all()
        serializer = CarparkSerializer(favorites, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        carpark_id = request.data.get('carpark_id')
        lot_type = request.data.get('lot_type')
        try:
            carpark = Carpark.objects.filter(carpark_id=carpark_id).filter(lot_type=lot_type).get()
            if carpark in request.user.blacklist.all():
                return Response(status=400, data={"error":"Carpark already in blacklist"})
            if carpark in request.user.favorite.all():
                return Response(status=400, data={"error":"Carpark already in favorites"})
            request.user.favorite.add(carpark)
            return Response(status=200, data={"message":"Carpark added to favorites"})
        except:
            return Response(status=404, data={"error":"Carpark not found, include id and lot type in request body. E.g. {'carpark_id': 'A0046', 'lot_type': 'C'}"})

    def delete(self, request):
        carpark_id = request.data.get('carpark_id')
        lot_type = request.data.get('lot_type')
        try:
            carpark = Carpark.objects.filter(carpark_id=carpark_id).filter(lot_type=lot_type).get()
            request.user.favorite.remove(carpark)
            return Response(status=200, data={"message":"Carpark removed from favorites"})
        except:
            return Response(status=404, data={"error":"Carpark not found, include id and lot type in request body. E.g. {'carpark_id': 'A0046', 'lot_type': 'C'}"})

class BlacklistView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SimpleCarparkSerializer

    def get(self, request):
        blacklist = request.user.blacklist.all()
        serializer = CarparkSerializer(blacklist, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        carpark_id = request.data.get('carpark_id')
        lot_type = request.data.get('lot_type')
        try:
            carpark = Carpark.objects.filter(carpark_id=carpark_id).filter(lot_type=lot_type).get()
            if carpark in request.user.blacklist.all():
                return Response(status=400, data={"error":"Carpark already in blacklist"})
            if carpark in request.user.favorite.all():
                return Response(status=400, data={"error":"Carpark already in favorites"})
            request.user.blacklist.add(carpark)
            return Response(status=200, data={"message":"Carpark added to blacklist"})
        except:
            return Response(status=404, data={"error":"Carpark not found, include id and lot type in request body. E.g. {'carpark_id': 'A0046', 'lot_type': 'C'}"})
    
    def delete(self, request):
        carpark_id = request.data.get('carpark_id')
        lot_type = request.data.get('lot_type')
        try:
            carpark = Carpark.objects.filter(carpark_id=carpark_id).filter(lot_type=lot_type).get()
            request.user.blacklist.remove(carpark)
            return Response(status=200, data={"message":"Carpark removed from blacklist"})
        except:
            return Response(status=404, data={"error":"Carpark not found, include id and lot type in request body. E.g. {'carpark_id': 'A0046', 'lot_type': 'C'}"})