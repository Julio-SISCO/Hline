from django.db import models

# Create your models here.

class Hotel (models.Model):
    nom = models.CharField(max_length=200)
    longitude = models.FloatField()
    latitude = models.FloatField()
    adresse = models.CharField(max_length=200)
    ville = models.CharField(max_length=100)
    description = models.TextField()
    nombre_etage = models.IntegerField()
    note = models.FloatField()
    site = models.URLField(max_length=400)
    # date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom


class HotelImage(models.Model):
    image = models.ImageField(upload_to='photos/hotels/')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)


class HotelEquipement(models.Model):
    nom = models.CharField(max_length=200)
    image = models.ImageField(upload_to='photos/hotelEquipements/')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return self.nom

class Chambre(models.Model):
    numero = models.IntegerField()
    etage = models.IntegerField()
    type = models.CharField(max_length=100)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.type

class ChambreImage(models.Model):
    image = models.ImageField(upload_to='photos/chambres/')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    chambre = models.ForeignKey(Chambre, on_delete=models.CASCADE)


class ChambreEquipement(models.Model):
    nom = models.CharField(max_length=200)
    image = models.ImageField(upload_to='photos/ChambreEquipements/')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    chambre = models.ForeignKey(Chambre, on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return self.nom
