from django.db import models

from locations.models import City, Sport, Federation
from leagues.models import Season

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Nom du pays
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='teams')  # Relation with city
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='teams')  # Relation with sport
    federation = models.ForeignKey(Federation, on_delete=models.CASCADE, related_name='teams')  # Relation with federation
    description = models.TextField(null=True, blank=True)  # Description
    flag = models.ImageField(upload_to='uploads/teams/', null=True, blank=True)  # flag
    logo = models.ImageField(upload_to='uploads/teams-logos/', null=True, blank=True)  # logo

    seasons = models.ManyToManyField(Season, related_name='teams', blank=True)

    def __str__(self):
        return self.name


class SeasonTeam(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    wins = models.PositiveIntegerField(default=0)
    losses = models.PositiveIntegerField(default=0)
    draws = models.PositiveIntegerField(default=0)
    goals_for = models.PositiveIntegerField(default=0)
    goals_against = models.PositiveIntegerField(default=0)
    class Meta:
        unique_together = ('season', 'team')

    def __str__(self):
        return f"{self.team.name} ({self.season.name})"