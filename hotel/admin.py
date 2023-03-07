from django.contrib import admin
from . models import *
from django.utils.translation import gettext_lazy as _
# Register your models here.


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'longitude', 'latitude', 'adresse', 'ville', 'description', 'nombre_etage', 'note', 'site']


@admin.register(HotelImage)
class HotelImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'hotel']


@admin.register(Chambre)
class ChambreAdmin(admin.ModelAdmin):
    list_display = ['numero', 'etage', 'type', 'hotel', 'description']


@admin.register(ChambreImage)
class ChambreImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'hotel', 'chambre']


@admin.register(ChambreEquipement)
class ChambreEquipementAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'image', 'hotel', 'chambre', 'description']


@admin.register(HotelEquipement)
class HotelEquipementAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'image', 'hotel', 'description']




admin.site.site_title = ("HOOYIA INVOICE SYSTEM")
admin.site.site_header = ("HOOYIA INVOICE SYSTEM")
admin.site.index_title = ("HOOYIA INVOICE SYSTEM")