# locations/urls.py

from rest_framework.routers import DefaultRouter
from .views import ContinentViewSet, CountryViewSet

router = DefaultRouter()
router.register(r'continents', ContinentViewSet)
router.register(r'countries', CountryViewSet)

urlpatterns = router.urls
