from django.urls import path
from .views import api_list_technicians, api_list_appointments, api_detail_appointment

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_detail_appointment, name="api_detail_appointment"),
]
