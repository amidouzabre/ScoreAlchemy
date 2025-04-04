from django.db import models
from federations.models import Federation
# Create your models here


class Tournament(models.Model):
    TYPE_CHOICES = [
        ('LEAGUE', 'League'),
        ('COMPETITION', 'Competition'),
    ]
    name = models.CharField(max_length=100) # ex: Ligue 1
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to="upaloads/tournaments/logos", blank=True, null=True)
    tournament_type = models.CharField(max_length=15, choices=TYPE_CHOICES)  # League ou Competition
    ranking = models.IntegerField(default=1)  # Classement (optionnel)
    is_national = models.BooleanField(default=True)  # Indique si c'est un championnat national
    federation = models.ForeignKey(Federation, on_delete=models.CASCADE, related_name="tournaments")

    def __str__(self):
        return self.name
