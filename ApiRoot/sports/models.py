from django.db import models


# Create your models here.
class Sport(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Nom du sport (ex. Football, Basket)
    description = models.TextField(null=True, blank=True)  # Description ou règles du sport (facultatif)
    is_team_sport = models.BooleanField(default=True)  # Indique si c'est un sport d'équipe ou individuel
    
    def __str__(self):
        return self.name


