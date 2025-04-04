from django.db import models
from competitions.models import Tournament

# Create your models here.
class Season(models.Model):
    name = models.CharField(max_length=20)  # ex: 2024-2025
    season_num = models.IntegerField()  # ex: 130
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    is_current = models.BooleanField(default=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name="seasons")

    def __str__(self):
        return self.name