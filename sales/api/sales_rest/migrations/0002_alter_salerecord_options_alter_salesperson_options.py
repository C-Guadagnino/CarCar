# Generated by Django 4.0.3 on 2022-05-12 00:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='salerecord',
            options={'ordering': ('automobile', 'sales_person', 'customer', 'price')},
        ),
        migrations.AlterModelOptions(
            name='salesperson',
            options={'ordering': ('name', 'employee_number')},
        ),
    ]
