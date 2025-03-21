from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from .models import Continent
from .serializers import ContinentSerializer


# Create your views here.
class ContinentViewSet(viewsets.ModelViewSet):
    queryset = Continent.objects.all()
    serializer_class = ContinentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]
    filterset_fields = ['name',]
    search_fields = ['name',]

