# Generated by Django 4.1.7 on 2023-04-06 21:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('practice', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='practicecompletionmodel',
            name='routine',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='practice.practiceroutinemodel'),
        ),
        migrations.CreateModel(
            name='UserAssignedPracticeRoutineModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('routine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='practice.practiceroutinemodel')),
            ],
        ),
    ]
