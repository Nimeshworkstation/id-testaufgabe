from django.contrib.auth.models import AbstractUser
from django.db import models


class RoleChoice(models.TextChoices):
    CUSTOMER = 'customer', 'Customer'
    TEAM = 'team', 'Creative Team'
    MANAGEMENT = 'management', 'Management'


class User(AbstractUser):
    role = models.CharField(max_length=20, choices=RoleChoice.choices, default=RoleChoice.CUSTOMER)
