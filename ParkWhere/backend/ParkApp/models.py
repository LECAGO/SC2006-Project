import datetime, timedelta
from django.db import models

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

    class Meta:
        ordering = ['carpark_id']
    
    def __str__(self):
        return self.carpark_id