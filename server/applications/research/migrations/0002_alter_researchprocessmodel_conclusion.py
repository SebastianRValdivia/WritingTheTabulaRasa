# Generated by Django 4.1.3 on 2022-12-08 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='researchprocessmodel',
            name='conclusion',
            field=models.TextField(blank=True),
        ),
    ]
