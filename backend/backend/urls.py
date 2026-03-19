from django.contrib import admin
from django.urls import path, include,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/request/', include('request.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
