import React from 'react';

class VehicleModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      manufacturers:[],
      manufacturer:'',
      model:'',
      pictureUrl:'',
    };
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.manufacturer_id = data.manufacturer;
    delete data.manufacturer;
    data.name = data.model;
    delete data.model;
    data.picture_url = data.pictureUrl;
    delete data.pictureUrl;
    delete data.manufacturers;

    const modelUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const modelPostResponse = await fetch(modelUrl, fetchConfig);
    if (modelPostResponse.ok) {
      const newModel = await modelPostResponse.json();
      console.log(newModel);

      const cleared = {
        manufacturer:'',
        model:'',
        pictureUrl:'',
      };
      this.setState(cleared);
    }

  }

  handleManufacturerChange(event) {
    const manufacturerValue = event.target.value;
    this.setState({manufacturer: manufacturerValue});
  }

  handleModelChange(event) {
    const modelValue = event.target.value;
    this.setState({model: modelValue});
  }

  handlePictureUrlChange(event) {
    const pictureUrlValue = event.target.value;
    this.setState({pictureUrl: pictureUrlValue});
  }

  async componentDidMount() {
    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const manufacturerResponse = await fetch(manufacturerUrl);

    if (manufacturerResponse.ok) {
      const manufacturerData = await manufacturerResponse.json();

      this.setState({manufacturers: manufacturerData.manufacturers});
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Vehicle Model</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="mb-3">
                  <select onChange={this.handleManufacturerChange} value={this.state.manufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose a Manufacturer</option>
                    {this.state.manufacturers.map(manufacturer => {
                      return (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleModelChange} value={this.state.model} placeholder="Vehicle Model Name" required type="text" name="model" id="model" className="form-control" />
                  <label htmlFor="model">Vehicle Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handlePictureUrlChange} value={this.state.pictureUrl} placeholder="Picture Url" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
                  <label htmlFor="pictureUrl">Picture Url</label>
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

export default VehicleModelForm;