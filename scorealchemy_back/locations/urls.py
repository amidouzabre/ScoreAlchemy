from django.urls import path
from rest_framework import routers
from . import api

from .views import ContinentViewSet


router = routers.DefaultRouter()
router.register(r'continents', ContinentViewSet)

urlpatterns = [
    path('continents/', api.continent_list, name='api_continent_list'),
    path('continents/<int:pk>/', api.continent_detail, name='api_continent_detail'),
]