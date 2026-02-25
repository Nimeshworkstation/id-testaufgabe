
from rest_framework import serializers
from .models import MediaRequest,Asset
from users.serializers import UserSerializer
class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'file', 'uploaded_at']


class MediaRequestSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True, read_only=True)
    customer = UserSerializer(read_only=True)  # add this

    class Meta:
        model = MediaRequest
        fields = [
            'id',
            'customer',
            'title',
            'description',
            'stadium_screen',
            'status',
            'finished_file',
            'broadcast_date',
            'notes',
            'assets',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [ 'customer', 'created_at', 'updated_at']