import React from 'react';

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      manufacturerName:'',
    };
    this.handleManufacturerNameChange = this.handleManufacturerNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.name = data.manufacturerName;
    delete data.manufacturerName;

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const manufacturerPostResponse = await fetch(manufacturerUrl, fetchConfig);
    if (manufacturerPostResponse.ok) {
      const newManufacturer = await manufacturerPostResponse.json();
      console.log(newManufacturer);

      const cleared = {
        manufacturerName: '',
      };
      this.setState(cleared);
    }

  }

  handleManufacturerNameChange(event) {
    const manufacturerNameValue = event.target.value;
    this.setState({manufacturerName: manufacturerNameValue});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Manufacturer</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleManufacturerNameChange} value={this.state.manufacturerName} placeholder="Manufacturer Name" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                  <label htmlFor="manufacturer">Manufacturer Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManufacturerForm;