# Generated by Django 4.0.3 on 2022-05-10 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_rename_assigned_tech_appointment_technician'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='reason',
            field=models.TextField(null=True),
        ),
    ]
