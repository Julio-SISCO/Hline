from . models import Customer
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django import forms


class UserForm(UserCreationForm):
    class Meta:
        model = Customer
        fields = ['firstname', 'lastname', 'email', 'locality', 'city', 'mobile', 'status', 'hotel']
        widgets = {
            'firstname': forms.TextInput(attrs={'class': 'form-control'}),
            'lastname': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'autofocus':'True', 'class': 'form-control'}),
            'locality': forms.TextInput(attrs={'class': 'form-control'}),
            'city': forms.TextInput(attrs={'class': 'form-control'}),
            'mobile': forms.NumberInput(attrs={'class': 'form-control'}),
            'status': forms.Select(attrs={'class': 'form-control'}),
            'hotel' : forms.Select(attrs={'class': 'form-control'}),    
        }


