# Generated by Django 4.1.2 on 2022-10-25 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('encyclopedia', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='encyclopediapagemodel',
            name='url',
            field=models.SlugField(blank=True, max_length=2000, unique=True),
        ),
    ]
