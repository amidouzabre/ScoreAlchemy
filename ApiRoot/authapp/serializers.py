from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from .models import User

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        #model = User #new
        fields = ('id', 'email', 'password', 'username', 'firstname', 'lastname',)

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        #model = User #new
        fields = ('id', 'email', 'username', 'firstname', 'lastname',)

