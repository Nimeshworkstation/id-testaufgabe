from django.contrib import admin
from .models import MediaRequest,Asset

# Register your models here.
@admin.register(MediaRequest)
class MediaRequestAdmin(admin.ModelAdmin):
    list_display = ['id','customer', 'title', 'status', 'created_at','finished_file']


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('request', 'file', 'uploaded_at')
