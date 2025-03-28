from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from .models import User

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User #new
        fields = ('id', 'email', 'password', 'username', 'firstname', 'lastname',)

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User #new
        fields = ('id', 'email', 'username', 'firstname', 'lastname','avatar')



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extends Simple JWT's TokenObtainPairSerializer to include the custom user data.
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        from .serializers import CustomUserSerializer  # Avoid circular imports
        user_data = CustomUserSerializer(self.user, context=self.context).data
        data.update({'user': user_data})
        return data