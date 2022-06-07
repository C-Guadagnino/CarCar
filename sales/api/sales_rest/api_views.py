from django.db import IntegrityError
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SaleRecord
from django.views.decorators.http import require_http_methods
import json

# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model=AutomobileVO
    properties=["color", "year", "vin", "model", "manufacturer"]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties=["name", "employee_number"]


@require_http_methods(["GET", "POST"])
def api_list_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        # IntegrityError is raised when trying to create a new SalesPerson instance
        # with existing employee number
        except:
            return JsonResponse(
                {"message": "Sales Person with emplyee number #" + str(content["employee_number"]) + " already exists. Please try a different employee number."},
                status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sales_person(request, empno):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(employee_number=empno)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(employee_number=empno)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            # below line is there for the purpose of catching a DoesNotExist BEFORE checking
            # whether the employee_number in the request body is the same as in the endpoint
            # example: endpoint empno is 800 (assume doesn't exit), and employee_number in request body is 8
            # we want it to return a "Does not exist" msg instead of "Updating empno is not allowed"
            sales_person = SalesPerson.objects.get(employee_number=empno)
            if "employee_number" in content and content["employee_number"] is not empno:
                return JsonResponse(
                    {"message": "Updating employee number is not allowed!"},
                    status=400
                )
            SalesPerson.objects.filter(employee_number=empno).update(**content)
            sales_person = SalesPerson.objects.get(employee_number=empno)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties=["name", "address", "phone_number", "id"]

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            # Below line is for purpose of catching DoesNotExist BEFORE
            # checking whether ID in request body matches ID in endpoint.
            # Say url pk is 99 (assume doesn't exist), and ID in request
            # body is 3. Then, it should return 404-"Does not exist" msg
            # instead of 400-"Updating customer ID is not allowed"
            customer = Customer.objects.get(id=pk)
            if "id" in content and content["id"] is not pk:
                return JsonResponse(
                    {"message": "Updating customer ID is not allowed!"},
                    status=400
                )
            Customer.objects.filter(id=pk).update(**content)
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

class SaleRecordEncoder(ModelEncoder):
    model=SaleRecord,
    properties=[
        "pk",
        "automobile",
        "sales_person",
        "customer",
        "price",
    ]
    encoders={
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_sale_records(request):
    if request.method == "GET":
        sale_records = SaleRecord.objects.all()
        return JsonResponse(
            {"sale_records": sale_records},
            encoder=SaleRecordEncoder
        )
    else:
        content = json.loads(request.body)

        if "automobile" in content and "sales_person" in content and "customer" in content and "price" in content:

            # Given the request is sent with price being a real number
            # if the request is sent via Insomnia, then
            # content["price"] is a real number (type float);
            # HOWEVER, if the request is sent via the React UI, then
            # content["price"] is a type str
            # EVEN THOUGH the JSX input tag is of type "number"
            # that's why float() is needed below when checking < 0
            if float(content["price"]) < 0:
                return JsonResponse(
                    {"message": "The Sale Price must be a positive number. Please enter a positive number."},
                    status=400,
                )

            try:
                request_vin = content["automobile"]
                content["automobile"] = AutomobileVO.objects.get(vin=request_vin)
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "This auto does not exist. Check VIN."},
                    status=404,
                )

            try:
                request_empno = content["sales_person"]
                content["sales_person"] = SalesPerson.objects.get(employee_number=request_empno)
            except SalesPerson.DoesNotExist:
                return JsonResponse(
                    {"message": "This sales person does not exist. Check Employee Number."},
                    status=404,
                )

            try:
                request_customer_id = content["customer"]
                content["customer"] = Customer.objects.get(id=request_customer_id)
            except Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "This customer does not exist. Check Customer ID."},
                    status=404,
                )

            try:
                sale_record = SaleRecord.objects.create(**content)

            # IntegrityError is raised when SaleRecord instance for this vin already exists
            except IntegrityError:
                return JsonResponse(
                    {"message": "Sale record for this automobile already exists."},
                    status=400,
                )
            # TypeError is raised when request object contains extra/random key
            except:
                return JsonResponse(
                    {"message": "Something went wrong. Might have received an unnecessary extra field. Please double check and try again."},
                    status=400,
                )

            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        else:
            return JsonResponse(
                {"message": "Please ensure all required fields are provided."},
                status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_sale_record(request, vin):
    if request.method == "GET":
        try:
            automobile_vo_obj = AutomobileVO.objects.get(vin=vin)
            sale_record = SaleRecord.objects.get(automobile=automobile_vo_obj)
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "This automobile does not exist. Check VIN."},
                status=404,
            )
        except SaleRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Auto exists, but sale record for this auto does not exist. Unsold car."},
                status=404,
            )
    elif request.method == "DELETE":

        try:
            automobile_vo_obj = AutomobileVO.objects.get(vin=vin)
            count, _ = SaleRecord.objects.filter(automobile=automobile_vo_obj).delete()
            if count > 0:
                return JsonResponse({"deleted": count > 0})
            else:
                return JsonResponse(
                    {"message": "Auto exists, but sale record for this car does not exist. Unsold car."}
                )

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "This automobile does not exist. Check VIN."},
            )


        # try:
        # automobile_vo_obj = AutomobileVO.objects.get(vin=vin)
        # sale_record = SaleRecord.objects.get(automobile=automobile_vo_obj)
        # print(sale_record)
        # sale_record.delete()
        # return JsonResponse(
        #     sale_record,
        #     encoder=SaleRecordEncoder,
        #     safe=False,
        # )
        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "This automobile does not exist. Check VIN."},
        #     )
        # except SaleRecord.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Auto exists, but sale record for this car does not exist. Unsold car."},
        #     )

    else:
        try:
            content = json.loads(request.body)
            try:
                try:
                    url_auto_vo_obj = AutomobileVO.objects.get(vin=vin)
                except AutomobileVO.DoesNotExist:
                    return JsonResponse(
                    {"message": "Auto does not exist. Check auto VIN in request url."},
                    status=404
                )

                if "automobile" in content and content["automobile"] != vin:
                    return JsonResponse(
                        {"message": "Updating an automobile VIN is not allowed. If necessary, delete the sale record and create a new one with the correct auto VIN."},
                        status=400
                    )
                elif "automobile" in content:
                    request_vin = content["automobile"]
                    auto_vo_obj = AutomobileVO.objects.get(vin=request_vin)
                    content["automobile"] = auto_vo_obj
                # when "automobile" is not in content dict, continue on
                else:
                    pass

                try:
                    empno = content["sales_person"]
                    sales_person_obj = SalesPerson.objects.get(employee_number=empno)
                    content["sales_person"] = sales_person_obj
                except SalesPerson.DoesNotExist:
                    return JsonResponse(
                        {"message": "This sales person does not exist. Check Employee Number."},
                        status=404,
                    )

                try:
                    customer_id = content["customer"]
                    customer_obj = Customer.objects.get(id=customer_id)
                    content["customer"] = customer_obj
                except Customer.DoesNotExist:
                    return JsonResponse(
                        {"message": "This customer does not exist. Check Customer ID."},
                        status=404,
                    )

                url_auto_vo_obj = AutomobileVO.objects.get(vin=vin)
                SaleRecord.objects.filter(automobile=url_auto_vo_obj).update(**content)
                sale_record = SaleRecord.objects.get(automobile=url_auto_vo_obj)
                return JsonResponse(
                    sale_record,
                    encoder=SaleRecordEncoder,
                    safe=False,
                )

            except SaleRecord.DoesNotExist:
                return JsonResponse(
                    {"message": "Auto exists, but sale record does not exist. Unsold car."},
                    status=404
                )

        # FieldDoesNotExist error is raised when an extra/random key present in content dict
        # KeyError is raised when content dict is empty
        except:
            return JsonResponse(
                {"message": "Invalid request body/input. Please double check."},
                status=400
            )