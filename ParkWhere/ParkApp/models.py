import datetime, timedelta

from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text
    
class Carpark(models.Model):
    id = models.CharField(max_length=4, primary_key=True)
    address = models.CharField(max_length=200)
    coordinates = models.CharField(max_length=50)
    availableLots = models.SmallIntegerField(default=0)
    totalLots = models.SmallIntegerField(default=0)
    lotType = models.CharField(max_length=50)
    agency = models.CharField(max_length=3)
    parkingSystem = models.CharField(max_length=50)
    shortTermParking = models.TextField()
    freeParking = models.TextField()
    nightParking = models.TextField()
    APItoFetch = models.CharField(max_length=50)
    history = HistoricalRecords()

    def __str__(self):
        return self.id
    
    def get_lots_1h_ago():
        return Carpark.history.as_of(datetime.now() - timedelta(hours = 1)).availableLots