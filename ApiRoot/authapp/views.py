import os
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile



from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .models import User


class LogoutView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, TokenError):
            return Response(status=status.HTTP_400_BAD_REQUEST)





class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer





class UpdateUserView(APIView):
    #permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def put(self, request):
        try:
            user_id = request.data.get('id')
            user = User.objects.get(id=user_id)  # Retrieve user from database

            data = request.data
            print(f"User: {data}")

            # Update user fields if provided in request
            if 'firstname' in data:
                user.firstname = data['firstname']
            if 'lastname' in data:
                user.lastname = data['lastname']
            if 'email' in data:
                user.email = data['email']
            #if 'avatar' in data:
            #    user.avatar = data['avatar']

            # Handle avatar file upload if provided
            if 'avatar' in request.FILES:
                avatar_file = request.FILES['avatar']
                avatar_path = os.path.join(settings.MEDIA_ROOT, 'uploads/avatars', avatar_file.name)
                path = default_storage.save(avatar_path, ContentFile(avatar_file.read()))
                user.avatar = path
            # Handle
            
            
            # Save the updated user
            user.save()  # Save changes

            # Return updated user data
            return Response({
                'message': 'User updated successfully',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'firstname': user.firstname,
                    'lastname': user.lastname
                }
            }, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)