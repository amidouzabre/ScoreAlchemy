from django.contrib import admin

from .models import Continent, Country, City, Confederation, Federation, Sport


admin.site.register(Continent)
admin.site.register(Country)
admin.site.register(City)
admin.site.register(Confederation)
admin.site.register(Federation)
admin.site.register(Sport)
# Register your models here.
