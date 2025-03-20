from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Continent
from .serializers import ContinentSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def continent_list(request):
    continents = Continent.objects.all()
    serializer = ContinentSerializer(continents, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def continent_detail(request, pk):
    continent = Continent.objects.get(pk=pk)
    serializer = ContinentSerializer(continent)
    return JsonResponse(serializer.data)