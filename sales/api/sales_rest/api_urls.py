from django.urls import path
from .api_views import api_list_sales_persons, api_show_sales_person, api_list_customers, api_show_customer, api_list_sale_records, api_show_sale_record


urlpatterns = [
    path('salespersons/', api_list_sales_persons, name="api_list_sales_persons"),
    path('salespersons/<int:empno>/', api_show_sales_person, name="api_show_sales_person"),
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:pk>/', api_show_customer, name="api_show_customer"),
    path('salerecords/', api_list_sale_records, name="api_list_sale_records"),
    path('salerecords/<str:vin>/', api_show_sale_record, name="api_show_sale_record"),
]