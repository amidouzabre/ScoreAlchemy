# Generated by Django 5.1.7 on 2025-04-04 15:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('locations', '0002_remove_federation_confederation_and_more'),
        ('sports', '0002_delete_federation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Federation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('continent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='federations', to='locations.continent')),
                ('country', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='federations', to='locations.country')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_federations', to='federations.federation')),
                ('sport', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='federations', to='sports.sport')),
            ],
        ),
    ]
