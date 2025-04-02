from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer


class LogoutView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []  # On désactive l'authentification pour cette vue.

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Token de rafraîchissement manquant."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, TokenError):
            return Response(
                {"detail": "Token invalide ou erreur lors de la désactivation."},
                status=status.HTTP_400_BAD_REQUEST
            )


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = request.user

        # Sécurité : on vérifie que l'ID envoyé correspond à l'utilisateur authentifié.
        if str(user.id) != request.data.get("id"):
            return Response(
                {"detail": "Vous n'êtes pas autorisé à modifier cet utilisateur."},
                status=status.HTTP_403_FORBIDDEN
            )


        print(f"Requse data : {request.data}")
        # Check if this is a password change request
        current_password = request.data.get("password")
        new_password = request.data.get("new_password")

        print(f"User: {user.email}")

        print(f"Auht? : {authenticate(username=user.email, password=current_password)}")

        print(f"password: {current_password} and newPassword: {new_password}")
        if current_password and new_password:
            if not authenticate(username=user.email, password=current_password):
                return Response({
                    "detail": "Current password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST
                )
            
            # Set new password
            user.set_password(new_password)
            user.save()

            # Blacklist all tokens for this user for security
            token = RefreshToken.for_user(user)
            token.blacklist()

            return Response({
                "detail": "Password changed successfully. Please lon in again."
            },
            status=status.HTTP_200_OK
            )


        # Mise à jour partielle de l'utilisateur.
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
