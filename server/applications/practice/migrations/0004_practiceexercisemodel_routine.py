# Generated by Django 4.1.7 on 2023-04-10 00:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0003_practiceexercisemodel_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='practiceexercisemodel',
            name='routine',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='practice.practiceroutinemodel'),
            preserve_default=False,
        ),
    ]
