from random import choices
from django.db import models

from locations.models import City, Country

# Create your models here.
class Player(models.Model):
    POSITION_CHOICES = [
        ('GK', 'Goalkeeper'),
        ('DEF', 'Defender'),
        ('MID', 'Midfielder'),
        ('FWD', 'Forward'),
    ]

    firstname = models.CharField(max_length=100)  # Name of Player
    lastname = models.CharField(max_length=100)  # Lastname of Player
    nationality = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='players', )  # Nationality of Player
    birthdate = models.DateField(null=True, blank=True)  # Birthdate of Player
    birthplace = models.CharField(max_length=100, null=True, blank=True)  # Birthplace of Player
    height = models.FloatField(help_text="Height in meters", null=True, blank=True)  # Height of Player
    weight = models.FloatField(help_text="Weight in kilograms", null=True, blank=True)  # Weight of Player
    position = models.CharField(max_length=3, choices=POSITION_CHOICES)  # Position of Player
    description = models.TextField(null=True, blank=True)  # Description
    photo = models.ImageField(upload_to='uploads/players/', null=True, blank=True)  # Photo

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

