# Generated by Django 4.1.5 on 2023-01-23 14:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0005_alter_literarynotemodel_reference'),
    ]

    operations = [
        migrations.RenameField(
            model_name='literarynotemodel',
            old_name='page',
            new_name='position',
        ),
        migrations.RenameField(
            model_name='literarynotemodel',
            old_name='reference',
            new_name='resource',
        ),
        migrations.RemoveField(
            model_name='literarynotemodel',
            name='time',
        ),
    ]
