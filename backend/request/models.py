from django.db import models
from users.models import User
# Create your models here.

class ScreenChoice(models.TextChoices):
    MAIN = 'screen_main', 'Main Screen'
    NORTH = 'screen_a', 'Screen A - North'
    SOUTH = 'screen_b', 'Screen B - South'
    EAST = 'screen_c', 'Screen C - East'
    WEST = 'screen_d', 'Screen D - West'


class StatusChoice(models.TextChoices):
    OPEN = 'open', 'Offen'
    IN_PROGRESS = 'in_progress', 'In Bearbeitung'
    COMPLETED = 'completed', 'Abgeschlossen'


class MediaRequest(models.Model):
    customer        = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    title           = models.CharField(max_length=255)
    description     = models.TextField()
    stadium_screen  = models.CharField(max_length=20, choices=ScreenChoice.choices)
    status          = models.CharField(max_length=20, choices=StatusChoice.choices, default=StatusChoice.OPEN)
    finished_file   = models.FileField(upload_to='finished/', null=True, blank=True)
    broadcast_date  = models.DateField(null=True, blank=True)
    notes           = models.TextField(null=True, blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class Asset(models.Model):
    request     = models.ForeignKey(MediaRequest, on_delete=models.CASCADE, related_name='assets')
    file        = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Asset for {self.request.title}"