# Generated by Django 4.1.4 on 2023-01-06 21:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('metadata', '0002_categorymodel'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EssayModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=2000, null=True, unique=True)),
                ('url', models.SlugField(blank=True, max_length=2000, unique=True)),
                ('content', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='metadata.categorymodel')),
                ('metadata', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='metadata.metadatamodel')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Essay',
                'verbose_name_plural': 'Essays',
            },
        ),
    ]
