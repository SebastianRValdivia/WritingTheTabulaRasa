# Generated by Django 4.1.4 on 2022-12-13 16:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0003_remove_imagemodel_title'),
        ('encyclopedia', '0003_encyclopediacardmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='encyclopediapagemodel',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='resources.imagemodel'),
        ),
    ]
