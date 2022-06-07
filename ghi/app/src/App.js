import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleModelList from './Inventory/VehicleModelList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AutomobileList from './Inventory/AutomobileList';
import AutomobileForm from './Inventory/AutomobileForm';
import SalesPersonForm from './Sales/SalesPersonForm';
import CustomerForm from './Sales/CustomerForm';
import SaleRecordList from './Sales/SaleRecordList';
import SaleRecordForm from './Sales/SaleRecordForm';
import SalesPersonHistory from './Sales/SalesPersonHistory';
import ServiceAppointmentList from './Services/ServiceAppointmentList';
import ServiceAppointmentForm from './Services/ServiceAppointmentForm';
import TechnicianForm from './Services/TechnicianForm';
import TechniciansList from './Services/TechnicianList'
import ServiceHistory from './Services/ServiceHistory';



function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/models" element={<VehicleModelList />} />
          <Route path="/models/new" element={<VehicleModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/salesperson/new" element={<SalesPersonForm />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/salerecords" element={<SaleRecordList />} />
          <Route path="/salerecords/new" element={<SaleRecordForm />} />
          <Route path="/salerecords/persalesperson" element={<SalesPersonHistory />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechniciansList techniciansList={props.technicansList}/>} />
          <Route path="/appointments" element={<ServiceAppointmentList serviceAppointments={props.serviceAppointments}/>} />
          <Route path="/appointments/new" element={<ServiceAppointmentForm />} />
          <Route path="/appointments/history" element={<ServiceHistory serviceAppointments={props.serviceAppointments}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
