# Generated by Django 4.1.4 on 2023-01-03 19:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0004_rename_quizzquestionmodel_quizzformulationquestionmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizzChoiceModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=2000)),
                ('correct', models.BooleanField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Question quizz choice',
                'verbose_name_plural': 'Question quizz choices',
            },
        ),
        migrations.AlterModelOptions(
            name='quizzformulationquestionmodel',
            options={'verbose_name': 'Quizz formulation question', 'verbose_name_plural': 'Quizz formulation questions'},
        ),
        migrations.CreateModel(
            name='QuizzChoicesQuestionModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('quizz', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='quizzes.quizzmodel')),
            ],
            options={
                'verbose_name': 'Quizz choice question',
                'verbose_name_plural': 'Quizz choice questions',
            },
        ),
    ]
