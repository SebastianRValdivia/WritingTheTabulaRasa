# Generated by Django 4.2.1 on 2023-05-19 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cheatsheets', '0004_sheetmodel_metadata'),
    ]

    operations = [
        migrations.AddField(
            model_name='sheetmodel',
            name='color',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]
