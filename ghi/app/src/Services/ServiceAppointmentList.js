import React from 'react';

class ServiceAppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: []
        };
    };

    
    async componentDidMount() {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ services: data.services})
        }
    }

    
    async isDelete(appointment_id){
        const deleteUrl = `http://localhost:8080/api/appointments/${appointment_id}/`;
        const fetchConfig = {method: "delete"}        
        const response = await fetch(deleteUrl, fetchConfig);
        if (response.ok) {
            window.location.reload();
        }
    };


    async isComplete(appointment_id){
        const putURL = `http://localhost:8080/api/appointments/${appointment_id}/`;
        const fetchConfig = {
            method: "put", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_finished: true})
        }; 

        const response = await fetch(putURL, fetchConfig);
        if (response.ok) {
            window.location.reload();
        }
    };

    render() {
        return (
            <div>
                <h1>Appointments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date and Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>VIP</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.services.map(appointment => {

                            let date = Date.parse(appointment.date_time)
                            const d = new Date(date)

                            let vipStatus = '';
                            let finishedStatus = ''

                            if (appointment.is_vip === false) {
                                vipStatus = 'Yes';
                            }
                            if (appointment.is_finished === true) {
                                finishedStatus = 'd-none'
                            }

                            return (
                                <tr key={appointment.id}>
                                    <td className={finishedStatus}>{appointment.vin}</td>
                                    <td className={finishedStatus}>{appointment.customer}</td>
                                    <td className={finishedStatus}>{d.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'numeric'})}</td>
                                    <td className={finishedStatus}>{appointment.technician.tech_name}</td>
                                    <td className={finishedStatus}>{appointment.reason}</td>
                                    <td className={finishedStatus}>{vipStatus}</td>
                                    <td className={finishedStatus}> 
                                        <button onClick={() => this.isDelete(appointment.id)} type="button" className='btn btn-warning'>Cancel</button>
                                        <button onClick={() => this.isComplete(appointment.id)} type="button" className='btn btn-success'>Finished</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ServiceAppointmentList;
