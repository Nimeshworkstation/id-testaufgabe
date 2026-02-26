from django.test import TestCase
from users.models import RoleChoice
from .factories import UserFactory, TeamUserFactory, ManagementUserFactory, CustomerUserFactory
from .serializers import UserSerializer
class UserModelTest(TestCase):

    def test_customer_role(self):
        user = CustomerUserFactory()
        self.assertEqual(user.role, RoleChoice.CUSTOMER)

    def test_team_role(self):
        user = TeamUserFactory()
        self.assertEqual(user.role, RoleChoice.TEAM)

    def test_management_role(self):
        user = ManagementUserFactory()
        self.assertEqual(user.role, RoleChoice.MANAGEMENT)

    def test_password_is_hashed(self):
        user = UserFactory()
        self.assertTrue(user.check_password("testpass123"))

    def test_unique_username(self):
        user1 = UserFactory()
        user2 = UserFactory()
        self.assertNotEqual(user1.username, user2.username)

    def test_unique_email(self):
        user1 = UserFactory()
        user2 = UserFactory()
        self.assertNotEqual(user1.email, user2.email)


class UserSerializerTest(TestCase):


    def test_rejects_duplicate_username(self):
        existing = CustomerUserFactory()
        data = {
            "username": existing.username,
            "email": CustomerUserFactory.build().email,
            "first_name": existing.first_name,
            "last_name": existing.last_name,
            "password": "testpass123",
            "role": RoleChoice.CUSTOMER,
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)

    def test_rejects_duplicate_email(self):
        existing = CustomerUserFactory()
        data = {
            "username": CustomerUserFactory.build().username,
            "email": existing.email,
            "first_name": existing.first_name,
            "last_name": existing.last_name,
            "password": "testpass123",
            "role": RoleChoice.CUSTOMER,
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

