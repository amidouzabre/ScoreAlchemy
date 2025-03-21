from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Continent
from .serializers import ContinentSerializer


# Create your views here.
class ContinentViewSet(viewsets.ModelViewSet):
    queryset = Continent.objects.all()
    serializer_class = ContinentSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['name',]
    search_fields = ['name',]

