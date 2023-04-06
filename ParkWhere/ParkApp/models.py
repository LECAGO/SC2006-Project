import datetime, timedelta

from django.db import models
from simple_history.models import HistoricalRecords

class Carpark(models.Model):
    carpark_id = models.CharField(max_length=5)
    address = models.CharField(max_length=200, blank=True)
    coordinates = models.CharField(max_length=50, blank=True)
    lots_available = models.SmallIntegerField(default=0, blank=True)
    total_lots = models.SmallIntegerField(default=0, blank=True)
    lot_type = models.CharField(max_length=1, blank=True)
    agency = models.CharField(max_length=3, blank=True)
    parking_system = models.CharField(max_length=50, blank=True)
    short_term_parking = models.TextField(blank=True)
    free_parking = models.TextField(blank=True)
    night_parking = models.TextField(blank=True)
    apitofetch = models.CharField(max_length=50, blank=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['carpark_id']
    
    
    def __str__(self):
        return self.carpark_id
    
    def get_lots_1h_ago():
        return Carpark.history.as_of(datetime.now() - timedelta(hours = 1)).availableLots
    
class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    favourites = models.ManyToManyField(Carpark, related_name='favourites')
    blacklist = models.ManyToManyField(Carpark, related_name='blacklist')

    class Meta:
        ordering = ['username']

    def __str__(self):
        return str(self.user_id)