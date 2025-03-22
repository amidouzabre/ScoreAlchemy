from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.models import EmailAddress

class CustomRegisterSerializer(RegisterSerializer):
    def validate_email(self, email):
        if email and EmailAddress.objects.filter(email=email, verified=True).exists():
            return email
        raise serializers.ValidationError("L'adresse email n'est pas vérifiée.")
