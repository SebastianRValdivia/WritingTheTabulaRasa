# Generated by Django 4.1.2 on 2022-10-15 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ReferenceModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=2000)),
                ('observations', models.TextField()),
            ],
            options={
                'verbose_name': 'Reference',
                'verbose_name_plural': 'References',
            },
        ),
    ]
