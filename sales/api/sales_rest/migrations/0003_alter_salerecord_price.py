# Generated by Django 4.0.3 on 2022-05-13 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_salerecord_options_alter_salesperson_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salerecord',
            name='price',
            field=models.DecimalField(decimal_places=3, max_digits=13),
        ),
    ]
