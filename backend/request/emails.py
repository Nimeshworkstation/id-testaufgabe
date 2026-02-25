from django.core.mail import send_mail
from django.conf import settings
from users.models import User

def send_new_request_email(media_request):
    team_emails = list(User.objects.filter(role='team').values_list('email', flat=True))
    send_mail(
        subject=f'New Media Request: {media_request.title}',
        message=f'''
Hello Team,

A new media request has been submitted.

Customer: {media_request.customer.email}
Title: {media_request.title}
Description: {media_request.description}
Screen: {media_request.stadium_screen}
Broadcast Date: {media_request.broadcast_date}
Submitted At: {media_request.created_at}

Please log in to the platform to review and process this request.

Best regards,
ID App
        ''',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=team_emails,
    )

def send_onprogress_request_email(media_request):
    management_emails = list(User.objects.filter(role='management').values_list('email', flat=True))
    send_mail(
        subject=f'Media Request In Progress: {media_request.title}',
        message=f'''
Hello,

Your media request is now being processed by our team.

Title: {media_request.title}
Description: {media_request.description}
Screen: {media_request.stadium_screen}
Broadcast Date: {media_request.broadcast_date}
Status: In Progress

We will notify you once the final product is ready.

Best regards,
ID App
        ''',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[media_request.customer.email]
    )

def send_completed_request_email(media_request):
    management_emails = list(User.objects.filter(role='management').values_list('email', flat=True))
    send_mail(
        subject=f'Media Request Completed: {media_request.title}',
        message=f'''
Hello,

Your media request has been completed and the final product is ready.

Title: {media_request.title}
Description: {media_request.description}
Screen: {media_request.stadium_screen}
Broadcast Date: {media_request.broadcast_date}
Status: Completed

Please log in to the platform to download your final file.

Best regards,
ID App
        ''',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[media_request.customer.email] + management_emails,
    )