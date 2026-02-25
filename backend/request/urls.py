from django.urls import path
from .views import MediaRequestListView, MediaRequestDetailView

urlpatterns = [
    path('', MediaRequestListView.as_view(), name='media-request-list'),
    path('<int:pk>/', MediaRequestDetailView.as_view(), name='media-request-detail'),
]