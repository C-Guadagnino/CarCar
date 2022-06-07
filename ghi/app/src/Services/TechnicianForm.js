import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tech_name: '',
            tech_id: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const newState = {}
        newState[event.target.id] = event.target.value;
        // console.log(event)
        this.setState(newState)
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const technicianURL = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(technicianURL, fetchConfig);
        if (response.ok) {
            const createTech = await response.json();
            console.log(createTech)

            const cleared = {
                tech_name: '',
                tech_id: '',
            };
            // delete data.tech_id
            // delete data.tech_name
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a New Technician</h1>
                <form onSubmit={this.handleSubmit} id="create-technician-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.tech_name} placeholder="Name" required type="text" id="tech_name" className="form-control" />
                    <label htmlFor="tech_name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChange} value={this.state.tech_id} placeholder="Tech ID" required type="text" id="tech_id" className="form-control" />
                    <label htmlFor="tech_id">Technician ID</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default TechnicianForm;
