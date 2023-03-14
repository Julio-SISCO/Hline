# Generated by Django 4.1.3 on 2023-03-14 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0007_hotel_hotelimage_chambre_hotel_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=200)),
                ('lastname', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=200)),
                ('locality', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=50)),
                ('mobile', models.CharField(default='', max_length=50)),
                ('status', models.CharField(choices=[('01', 'admin'), ('02', 'manager'), ('03', 'tourist')], max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='hotel',
            name='region',
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]
