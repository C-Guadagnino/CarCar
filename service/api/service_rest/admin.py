from django.contrib import admin

from .models import AutomobileVO, Technician, Appointment
# Register your models here.
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
  pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentModel(admin.ModelAdmin):
    pass