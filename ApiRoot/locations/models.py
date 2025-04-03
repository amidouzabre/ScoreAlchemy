from django.db import models

# Create your models here.
class Continent(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Nom du continent (ex. Afrique, Europe)
    code = models.CharField(max_length=2, unique=True) # Code ISO (ex. AF pour l'Afrique)
    
    def __str__(self):
        return self.name

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Nom du pays
    code_2 = models.CharField(max_length=2, unique=True)  # Code ISO (ex. CI pour Côte d’Ivoire)
    code_3 = models.CharField(max_length=3, unique=True, blank=True, null=True)  # Code ISO (ex. CIV pour Côte d’Ivoire)
    code_num = models.CharField(max_length=3, unique=True, blank=True, null=True)  # Code ISO (ex. 384 pour Côte d’Ivoire)
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE, related_name='countries')  # Relation avec le continent
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "countries"

class City(models.Model):
    name = models.CharField(max_length=100)  # Nom de la ville
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='cities')  # Relation avec le pays
    
    def __str__(self):
        return f"{self.name}, {self.country.name}"

    class Meta:
        verbose_name_plural = "cities"


class Confederation(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Nom de la confédération (ex. UEFA, CAF)
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE, related_name='confederations')  # Relation avec le continent
    
    def __str__(self):
        return self.name

class Federation(models.Model):
    name = models.CharField(max_length=100)  # Nom de la fédération (ex. Fédération Française de Football)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='federations')  # Relation avec le pays
    confederation = models.ForeignKey(Confederation, on_delete=models.SET_NULL, null=True, related_name='federations')  # Relation avec la confédération
    
    def __str__(self):
        return self.name

