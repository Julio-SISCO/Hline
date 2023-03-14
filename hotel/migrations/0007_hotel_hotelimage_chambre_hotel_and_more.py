# Generated by Django 4.1.3 on 2023-03-11 00:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0006_remove_hotelimage_hotel_remove_chambre_hotel_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=200)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('adresse', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('tel', models.CharField(max_length=100)),
                ('ville', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('nombre_etage', models.IntegerField()),
                ('note', models.FloatField()),
                ('site', models.URLField(max_length=400)),
            ],
        ),
        migrations.CreateModel(
            name='HotelImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='photos/hotels/')),
                ('hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel')),
            ],
        ),
        migrations.AddField(
            model_name='chambre',
            name='hotel',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chambreequipement',
            name='hotel',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chambreimage',
            name='hotel',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='hotelequipement',
            name='hotel',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel'),
            preserve_default=False,
        ),
    ]