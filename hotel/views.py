import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from . models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
def index(request):
    return render(request, 'index.html', {})


# def chambre(request):
#     chambres = Chambre.objects.all()
#     return render(request, 'chambre.html', {'chambres': chambres})


def AjoutChambre(request):
    return render(request, 'AjoutChambre.html', {})


@api_view(['GET'])
def hotel(request):
    objets = Hotel.objects.all()
    objets_list = list(objets.values())
    data = json.dumps(objets_list)
    return Response(data)


def chambre(request):
    # Récupérer les objets à partir du modèle
    objets = Chambre.objects.all()

    # Convertir QuerySet en liste de dictionnaires
    objets_list = list(objets.values())

    # Convertir la liste en JSON
    data = json.dumps(objets_list)

    # Renvoyer une réponse JSON
    return Response(data)


def hotel_image(request):
    objets = HotelImage.objects.all()
    objets_list = list(objets.values())
    data = json.dumps(objets_list)
    return Response(data)


def chambre_image(request):  
    objets = ChambreImage.objects.all()
    objets_list = list(objets.values())
    data = json.dumps(objets_list)
    return Response(data)


def hotel_equip(request):  
    objets = HotelEquipement.objects.all()
    objets_list = list(objets.values())
    data = json.dumps(objets_list)
    return Response(data)


def chambre_equip(request):  
    objets = ChambreEquipement.objects.all()
    objets_list = list(objets.values())
    data = json.dumps(objets_list)
    return Response(data)
