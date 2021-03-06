# Generated by Django 4.0.3 on 2022-05-09 23:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=50)),
                ('year', models.PositiveSmallIntegerField()),
                ('vin', models.CharField(max_length=17, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tech_name', models.CharField(max_length=200)),
                ('tech_id', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.CharField(max_length=200)),
                ('apt', models.DateTimeField()),
                ('assigned_tech', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='technician', to='service_rest.technician')),
                ('vin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vehicle_number', to='service_rest.automobilevo')),
            ],
        ),
    ]
