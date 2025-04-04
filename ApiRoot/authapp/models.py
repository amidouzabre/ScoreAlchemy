import uuid
import os
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models


# Create your models here.
class CustomUserManager(UserManager):
    def _create_user(self, username, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not specified a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)

        return user
    
    def create_user(self, username=None, email =None, password =None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)
    
    def create_superuser(self, username=None, email =None, password =None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(username, email, password, **extra_fields)
    

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=255)
    firstname = models.CharField(max_length=30, blank=True)
    lastname = models.CharField(max_length=30, blank=True)
    avatar = models.ImageField(upload_to='uploads/avatars', blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def __str__(self):
        return self.email


    def has_perm(self, perm, obj=None):
        """Return True if the user has the specified permission."""
        return self.is_superuser

    def has_module_perms(self, app_label):
        """Return True if the user has permissions for the given app."""
        return self.is_superuser


    #def save(self, *args, **kwargs):
    #    if self.pk:
    #        old_avatar = User.objects.get(pk=self.pk).avatar
    #        if old_avatar and old_avatar != self.avatar:
    #            old_avatar_path = os.path.join(settings.MEDIA_ROOT, old_avatar.name)
    #            if os.path.exists(old_avatar_path):
    #                os.remove(old_avatar_path)
    #    super().save(*args, **kwargs)

    def save(self, *args, **kwargs):
        if self.pk:  # Vérifie si une clé primaire existe (ce qui indique que l'utilisateur a été créé)
            try:
                old_avatar = User.objects.get(pk=self.pk).avatar
                if old_avatar and old_avatar != self.avatar:
                    old_avatar_path = os.path.join(settings.MEDIA_ROOT, old_avatar.name)
                    if os.path.exists(old_avatar_path):
                        os.remove(old_avatar_path)
            except ObjectDoesNotExist:
                # Si l'utilisateur n'existe pas encore, ignorez cette partie
                pass
        super().save(*args, **kwargs)  # Appelle la méthode save de la classe parent