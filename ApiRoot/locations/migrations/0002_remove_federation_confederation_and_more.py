# Generated by Django 5.1.7 on 2025-04-04 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='federation',
            name='confederation',
        ),
        migrations.RemoveField(
            model_name='federation',
            name='country',
        ),
        migrations.RemoveField(
            model_name='federation',
            name='sport',
        ),
        migrations.DeleteModel(
            name='Confederation',
        ),
        migrations.DeleteModel(
            name='Federation',
        ),
        migrations.DeleteModel(
            name='Sport',
        ),
    ]
