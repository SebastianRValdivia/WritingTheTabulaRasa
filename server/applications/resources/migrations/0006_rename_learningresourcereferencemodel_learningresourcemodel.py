# Generated by Django 4.1.5 on 2023-01-17 19:39

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0005_alter_literarynotemodel_reference'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('resources', '0005_delete_referencemodel_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='LearningResourceReferenceModel',
            new_name='LearningResourceModel',
        ),
    ]
