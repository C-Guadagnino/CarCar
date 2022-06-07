from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

# Create your views here.
class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "tech_name",
        "tech_id",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "is_vip",
        "is_finished"
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }



class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "is_vip",
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }




@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        print(content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        services = Appointment.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician_number = content["technician"]
            technician = Technician.objects.get(tech_id=technician_number)
            content["technician"] = technician 
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status = 400,
            )
        vin_number = content["vin"]

        if AutomobileVO.objects.filter(vin=vin_number).exists():
            content["is_vip"] = True
        else:
            content["is_vip"] = False

        services = Appointment.objects.create(**content)
        return JsonResponse(
            services,
            encoder = AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "PUT"])
def api_detail_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        service = Appointment.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=AppointmentDetailEncoder,
            safe=False
        )
