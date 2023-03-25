from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_view


urlpatterns = [
    path('chambre', views.ChambreView.as_view, name='chambre'),
    path("chambre_equip/<hotel>/<chambre>/",views.ChambreEquipementView.as_view(), name='chambre_equip'),
    path('chambre_image/<hotel>/<chambre>/', views.HotelImageView.as_view, name='chambre_image'),
    path("hotel", views.HotelView.as_view(), name='hotel'),
    path("hotel_equip/<hotel>/", views.HotelEquipementView.as_view(), name='hotel_equip'),
    path('hotel_image/<hotel>/', views.HotelImageView.as_view(), name='hotel_image'),


]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
