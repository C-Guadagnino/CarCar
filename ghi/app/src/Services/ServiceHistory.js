import React from 'react';

function formatDate(date) {
    return date
}

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async handleVinSearchSubmit(event) {
        event.preventDefault();
        const searchURL = `http://localhost:3000/servicehistory`
        const fetchConfig = {
            method: "get"
        };
        const response = await fetch(searchURL, fetchConfig)
    }

    async componentDidMount() {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ services: data.services})
        }
    }

    render() {
        return (
            <div>
            <div>
                <form onSubmit={this.handleVinSearchSubmit}>
                <input
                    type="text"
                    id="search"
                    value={this.state.search}
                    placeholder="Search VINs"
                    name="vin"
                    onChange={this.handleChange}
                />
                <button>Search</button>
        </form>
            </div>
            <h1>Service History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer name</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.services.map(service => {
                        let date = Date.parse(service.date_time)
                        const newDate = new Date(date)
                        let vipStatus = '';
                        let finishedStatus = ''


                        if (service.is_vip === true) {
                            vipStatus = 'Yes';
                        }
                        if (service.is_finished === false) {
                            finishedStatus = 'd-none'
                        }

                        if (service.vin === this.state.search) {
                        }
                        else {
                            finishedStatus = 'd-none'
                        }
                        return (
                            <tr key={service.id}>
                                <td className={finishedStatus}>{service.vin}</td>
                                <td className={finishedStatus}>{service.customer}</td>
                                <td className={finishedStatus}>{ newDate.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'numeric'})}</td>
                                <td className={finishedStatus}>{service.technician.name}</td>
                                <td className={finishedStatus}>{service.reason}</td>
                                <td className={finishedStatus}>
                                    {vipStatus}
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

export default ServiceHistory;