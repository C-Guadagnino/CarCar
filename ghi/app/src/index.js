import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadDealership() {
  let manufacturerData, modelData, automobileData, saleRecordData, serviceAppointmentData;
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const modelResponse = await fetch('http://localhost:8100/api/models/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  const saleRecordResponse = await fetch('http://localhost:8090/api/salerecords/');
  const serviceAppointmentResponse = await fetch('http://localhost:8080/api/appointments/');


  if (manufacturerResponse.ok) {
    manufacturerData = await manufacturerResponse.json();
    // console.log('manufacturer data ', manufacturerData);
  } else {
    console.error(manufacturerResponse);
  }

  if (modelResponse.ok) {
    modelData = await modelResponse.json();
    // console.log('model data ', modelData);
  } else {
    console.error(modelResponse);
  }

  if (automobileResponse.ok) {
    automobileData = await automobileResponse.json();
    // console.log('automobile data ', automobileData);
  } else {
    console.error(automobileResponse);
  }

  if (saleRecordResponse.ok) {
    saleRecordData = await saleRecordResponse.json();
    // console.log('sale record data ', saleRecordData);
  } else {
    console.error(saleRecordResponse);
  }

  if (serviceAppointmentResponse.ok) {
    serviceAppointmentData = await serviceAppointmentResponse.json();
    // console.log('service appointment data ', serviceAppointmentData);
  } else {
    console.error(serviceAppointmentResponse);
  }

  root.render(
    <React.StrictMode>
      <App manufacturers={manufacturerData.manufacturers} models={modelData.models} automobiles={automobileData.autos} saleRecords={saleRecordData.sale_records} serviceAppointments={serviceAppointmentData.appointments}/>
    </React.StrictMode>
  );
}


loadDealership();
