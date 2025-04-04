from django.db import models

from locations.models import Continent, Country
from sports.models import Sport

# Create your models here.
class Federation(models.Model):
    name = models.CharField(max_length=100)  # ex: UEFA
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name="sub_federations")
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE, null=True, blank=True, related_name="federations")
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, blank=True, related_name="federations")
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name="federations")

    def __str__(self):
        return self.name