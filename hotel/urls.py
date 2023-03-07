from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_view


urlpatterns = [
    path('chambre', views.chambre, name='chambre'),
    path("chambre_equip", views.hotel_equip, name='chambre_equip'),
    path('chambre_image', views.hotel_image, name='chambre_image'),
    path("", views.hotel, name='hotel'),
    path("hotel_equip", views.hotel_equip, name='hotel_equip'),
    path('hotel_image', views.hotel_image, name='hotel_image'),


]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
