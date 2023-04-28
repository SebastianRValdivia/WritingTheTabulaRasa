# Generated by Django 4.1.7 on 2023-04-27 09:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metadata', '0003_categorymodel_created_categorymodel_updated_and_more'),
        ('resources', '0009_learningresourcemodel_created_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='learningresourcemodel',
            name='category',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='metadata.categorymodel'),
        ),
        migrations.AddField(
            model_name='learningresourcemodel',
            name='metadata',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='metadata.metadatamodel'),
        ),
    ]
