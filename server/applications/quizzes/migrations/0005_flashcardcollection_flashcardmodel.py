# Generated by Django 4.1.5 on 2023-02-20 16:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0004_rename_size_quizzquestionmodel_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='FlashCardCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=2000)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Flashcard collection',
                'verbose_name_plural': 'Flashcard collections',
            },
        ),
        migrations.CreateModel(
            name='FlashCardModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hint', models.TextField()),
                ('response', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quizzes.flashcardcollection')),
            ],
            options={
                'verbose_name': 'Flashcard',
                'verbose_name_plural': 'Flashcards',
            },
        ),
    ]
