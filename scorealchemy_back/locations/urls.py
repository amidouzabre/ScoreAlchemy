from django.urls import path

from . import api

urlpatterns = [
    path('continents/', api.continent_list, name='api_continent_list'),
    path('continents/<int:pk>/', api.continent_detail, name='api_continent_detail'),
]