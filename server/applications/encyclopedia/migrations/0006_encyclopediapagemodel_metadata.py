# Generated by Django 4.1.4 on 2022-12-30 16:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('metadata', '0002_categorymodel'),
        ('encyclopedia', '0005_rename_page_encyclopediacardmodel_pg'),
    ]

    operations = [
        migrations.AddField(
            model_name='encyclopediapagemodel',
            name='metadata',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='metadata.metadatamodel'),
        ),
    ]
