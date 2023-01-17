# Generated by Django 4.1.5 on 2023-01-17 11:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0004_learningresourcereferencemodel'),
        ('notes', '0004_notemodel_audio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='literarynotemodel',
            name='reference',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resources.learningresourcereferencemodel'),
        ),
    ]
