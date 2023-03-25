from . serializer import *
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from . models import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views import View
from . forms import UserForm
from django.contrib import messages
# Create your views here.


class RegisterView(APIView):
    def get(self, request):
        form = UserForm()
        return Response(form)

    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            firstname = form.cleaned_data['firstname']
            lastname = form.cleaned_data['lastname']
            email = form.cleaned_data['email']
            locality = form.cleaned_data['locality']
            city = form.cleaned_data['city']
            mobile = form.cleaned_data['mobile']
            status = form.cleaned_data['state']
            reg = Customer(firstname=firstname, lastname=lastname, email=email, locality=locality, city=city, mobile=mobile, status=status)
            reg.save()
            messages.success(
                request, "Congratulations! Address Updated Successfully")
            return Response(True)
        else:
            messages.warning(request, "Invalid Input Data")
            return Response(False)
    

class HotelView(APIView):
    serializer_hotel = HotelSerializer
    def get(self, request):
        Hs = [{"nom": H.nom, "longitude": H.longitude, "latitude": H.latitude, "adresse": H.adresse, "email": H.email, "tel": H.tel, "ville": H.ville, "region": H.region,
               "description": H.description, "nombre_etage": H.nombre_etage, "note": H.note, "site": H.site} for H in Hotel.objects.all()]
        return Response(Hs)

    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class HotelImageView(APIView):
    serializer_hotel = HotelImageSerializer

    def get(self, request, hotel):
        Hs = [{"image": I.image, "hotel": I.hotel, "url" : I.image.url} for I in HotelImage.objects.filter(hotel = hotel)]
        return Response(Hs)

    def post(self, request):
        serializer = HotelImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class HotelEquipementView(APIView):
    serializer_hotel = HotelEquipementSerializer

    def get(self, request, hotel):
        Hs = [{"nom" : I.nom,"image": I.image, "hotel": I.hotel, "url": I.image.url}
              for I in HotelEquipement.objects.filter(hotel=hotel)]
        return Response(Hs)

    def post(self, request):
        serializer = HotelEquipementSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        

class ChambreView(APIView):
    serializer_hotel = ChambreSerializer

    def get(self, request, hotel):
        Hs = [{"numero": I.numero, "etage": I.etage, "type" : I.type, "hotel": I.hotel, "description": I.description} for I in Chambre.objects.filter(hotel = hotel)]
        return Response(Hs)

    def post(self, request):
        serializer = ChambreSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ChambreImageView(APIView):
    serializer_hotel = ChambreImageSerializer

    def get(self, request, hotel, chambre):
        Hs = [{"image": I.image, "hotel": I.hotel, "chambre": I.chambre, "url": I.image.url}
              for I in ChambreImage.objects.filter(hotel=hotel, chambre=chambre)]
        return Response(Hs)

    def post(self, request):
        serializer = ChambreImageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ChambreEquipementView(APIView):
    serializer_hotel = ChambreEquipementSerializer

    def get(self, request, hotel, chambre):
        Hs = [{"nom": I.nom, "image": I.image, "hotel": I.hotel, "chambre": I.chambre, "url": I.image.url}
              for I in ChambreEquipement.objects.filter(hotel=hotel, chambre=chambre)]
        return Response(Hs)

    def post(self, request):
        serializer = ChambreEquipementSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)





# def chambre(request):
#     # Récupérer les objets à partir du modèle
#     objets = Chambre.objects.all()

#     # Convertir QuerySet en liste de dictionnaires
#     objets_list = list(objets.values())

#     # Convertir la liste en JSON
#     data = json.dumps(objets_list)

#     # Renvoyer une réponse JSON
#     return Response(data)


# def hotel_image(request):
#     objets = HotelImage.objects.all()
#     objets_list = list(objets.values())
#     data = json.dumps(objets_list)
#     return Response(data)


# def chambre_image(request):  
#     objets = ChambreImage.objects.all()
#     objets_list = list(objets.values())
#     data = json.dumps(objets_list)
#     return Response(data)


# def hotel_equip(request):  
#     objets = HotelEquipement.objects.all()
#     objets_list = list(objets.values())
#     data = json.dumps(objets_list)
#     return Response(data)


# def chambre_equip(request):  
#     objets = ChambreEquipement.objects.all()
#     objets_list = list(objets.values())
#     data = json.dumps(objets_list)
#     return Response(data)
