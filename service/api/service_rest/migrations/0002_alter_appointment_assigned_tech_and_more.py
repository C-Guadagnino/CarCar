# Generated by Django 4.0.3 on 2022-05-10 21:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='assigned_tech',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='technician', to='service_rest.technician'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=17, null=True),
        ),
    ]
