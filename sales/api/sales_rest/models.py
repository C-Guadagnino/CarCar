from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=50)

    def __str__(self):
        return str(self.year) + " " + self.color + " " + self.manufacturer + " " + self.model + " - " + str(self.vin)


class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name + " - EmpNo: " + str(self.employee_number)

    def get_api_url(self):
        return reverse("api_show_sales_person", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("name", "employee_number")


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class SaleRecord(models.Model):
    automobile = models.OneToOneField(
        "AutomobileVO",
        related_name="salerecord",
        # when an auto is deleted from database,
        # corresponding sale record instance should stay intact
        on_delete=models.PROTECT,
        primary_key=True,
    )
    sales_person = models.ForeignKey(
        "SalesPerson",
        related_name="salerecords",
        # when a sales_person is deleted from database,
        # corresponding sale record instance should stay intact
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        "Customer",
        related_name="salerecords",
        # when a customer is deleted from database,
        # corresponding sale record instance should stay intact
        on_delete=models.PROTECT,
    )
    price = models.DecimalField(max_digits=13, decimal_places=3)

    def __str__(self):
        return "Sale Record by " + self.sales_person.name + " for " + str(self.automobile.vin)

    class Meta:
        ordering = ("automobile", "sales_person", "customer", "price")