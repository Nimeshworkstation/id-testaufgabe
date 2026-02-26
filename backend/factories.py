import factory
from users.models import User, RoleChoice


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User



class TeamUserFactory(UserFactory):
    role = RoleChoice.TEAM


class ManagementUserFactory(UserFactory):
    role = RoleChoice.MANAGEMENT


class CustomerUserFactory(UserFactory):
    role = RoleChoice.CUSTOMER



