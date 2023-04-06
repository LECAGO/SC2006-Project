from django.shortcuts import render
from django.views import generic
import requests

from .models import Carpark, User
from .serializer import CarparkSerializer, UserSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view



class IndexView(generic.ListView):
    template_name = 'ParkApp/index.html'
    def get_queryset(self):
        return

    
def testAPIcall(request):
    response = requests.get('https://jsonplaceholder.typicode.com/users')
    users = response.json()
    print(users)
    return render(request, "ParkApp/test.html", {'users': users})


@api_view(['GET'])
def getCarpark(request):
    try:
        filtered_search = Carpark.objects.filter(carpark_id=request.GET.get('q')).filter(lot_type="C").get()
        serializer = CarparkSerializer(filtered_search)
        return Response(serializer.data)
    except:
        return Response(status=404, data="Query not found, use 'q' parameter to search Carparks by ID number. E.g. ParkApp/GetCarpark/?q=A0046")

        # # Unused code to return all Carpark data in database
        # carpark = Carpark.objects.all()
        # serializer = CarparkSerializer(carpark, many=True)
        # return Response(serializer.data)

@api_view(['POST'])
def postCarkpark(request):
    serializer = CarparkSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
    return Response(serializer.data)

@api_view(['PUT'])
def putCarpark(request):
    # TODO match PUT request params to Carpark's carpark_id and lot_type, and update this Carpark's data
    # https://stackoverflow.com/questions/48777490/update-put-request-in-django-rest-framework
    return

@api_view(['GET'])
def getUser(request):
    try:
        filtered_search = User.objects.filter(user_id=request.GET.get('q')).get()
        serializer = UserSerializer(filtered_search)
        return Response(serializer.data)
    except:
        return Response(status=404, data="Query not found, use 'q' parameter to search Users by ID number. E.g. ParkApp/GetUser/?q=0")
    
        # # Unused code to return all User data in database
        # user = User.objects.all()
        # serializer = UserSerializer(user, many=True)
        # return Response(serializer.data)

@api_view(['POST'])
def postUser(request):
    serializer = UserSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)
    return Response(serializer.data)

@api_view(['PUT'])
def putUser(request):
    #TODO similar to putCarpark
    return