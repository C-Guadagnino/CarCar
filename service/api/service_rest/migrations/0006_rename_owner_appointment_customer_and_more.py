# Generated by Django 4.0.3 on 2022-05-11 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_remove_appointment_apt_appointment_date_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='owner',
            new_name='customer',
        ),
        migrations.RenameField(
            model_name='appointment',
            old_name='status',
            new_name='is_finished',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='is_vip',
            field=models.BooleanField(default=False),
        ),
    ]