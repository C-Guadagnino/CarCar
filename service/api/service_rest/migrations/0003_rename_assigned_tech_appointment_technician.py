# Generated by Django 4.0.3 on 2022-05-10 22:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_appointment_assigned_tech_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='assigned_tech',
            new_name='technician',
        ),
    ]