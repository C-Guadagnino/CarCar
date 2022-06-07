from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

    # this is my encoder model which will transfer the data from 
    # automobile into this part of the app

class Technician(models.Model):
    tech_name = models.CharField(max_length=200)
    tech_id = models.CharField(max_length=200)

    def __str__(self):
        return self.tech_name

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.id})

    # technician model, just to create a tech to assign to the appointment later
    # this needs to be added to the navigation bar to easily access creating a technician


class Appointment(models.Model):
    customer = models.CharField(max_length=200, null=True)
    vin = models.CharField(max_length=300, null=True)
    date_time = models.DateTimeField(null=True)
    reason = models.TextField(null=True)
    technician = models.ForeignKey(
        "Technician", 
        related_name="appointments", 
        on_delete=models.PROTECT,
        null=True)
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)



    # when this form is submitted it should be saved in the application
    # I believe this is handled in the views portion when you create the form
    # using fields.... 

