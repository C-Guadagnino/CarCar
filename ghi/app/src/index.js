import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadDealership() {
  let serviceAppointmentData;
  const serviceAppointmentResponse = await fetch('http://localhost:8080/api/appointments/');

  if (serviceAppointmentResponse.ok) {
    serviceAppointmentData = await serviceAppointmentResponse.json();
  } else {
    console.error(serviceAppointmentResponse);
  }

  root.render(
    <React.StrictMode>
      <App serviceAppointments={serviceAppointmentData.appointments}/>
    </React.StrictMode>
  );
}

loadDealership();
