from . models import *
from rest_framework import serializers


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields= ['nom', 'longitude', 'latitude', 'adresse', 'email', 'tel', 'ville', 'region', 'description', 'nombre_etage', 'note', 'site']

    
class HotelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelImage
        fields = ['image', 'hotel']


class HotelEquipementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelEquipement
        fields = ['nom', 'image', 'hotel', 'description']



class ChambreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chambre
        fields = ["numero", "etage", "type", "hotel", "description"]



class ChambreImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChambreImage
        fiels = ["image", "hotel", "chambre"]



class ChambreEquipementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChambreEquipement
        fields = ["nom", "image", "hotel", "chambre", "description"]
        
        
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email', 'firstname', 'lastname', 'locality', 'city', 'mobile', 'status', 'hotel']
