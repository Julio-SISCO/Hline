# Generated by Django 4.1.3 on 2023-03-05 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='site',
            field=models.URLField(default=None, max_length=400),
            preserve_default=False,
        ),
    ]