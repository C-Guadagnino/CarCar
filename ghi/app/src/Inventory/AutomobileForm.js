import React from 'react';

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      models:[],
      model:'',
      color:'',
      year:'',
      vin:'',
    };
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleVINChange = this.handleVINChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.model_id = data.model;
    delete data.model;
    delete data.models;

    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const automobilePostResponse = await fetch(automobileUrl, fetchConfig);
    if (automobilePostResponse.ok) {
      const newAutomobile = await automobilePostResponse.json();
      console.log(newAutomobile);

      const cleared = {
        model:'',
        color:'',
        year:'',
        vin:'',
      };
      this.setState(cleared);
    } else {
      const jsonErrorMessage = (await automobilePostResponse.json()).message;
      alert(jsonErrorMessage);
    }

  }

  handleModelChange(event) {
    const modelValue = event.target.value;
    this.setState({model: modelValue});
  }

  handleYearChange(event) {
    const modelValue = event.target.value;
    this.setState({year: modelValue});
  }

  handleColorChange(event) {
    const colorValue = event.target.value;
    this.setState({color: colorValue});
  }

  handleVINChange(event) {
    const VINValue = event.target.value;
    this.setState({vin: VINValue});
  }

  async componentDidMount() {
    const modelUrl = 'http://localhost:8100/api/models/';
    const modelResponse = await fetch(modelUrl);

    if (modelResponse.ok) {
      const modelData = await modelResponse.json();

      this.setState({models: modelData.models});
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Vehicle</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="mb-3">
                  <select onChange={this.handleModelChange} value={this.state.model} required name="model" id="model" className="form-select">
                    <option value="">Choose a Model</option>
                    {this.state.models.map(model => {
                      return (
                        <option key={model.id} value={model.id}>
                          {model.manufacturer.name} {model.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleYearChange} value={this.state.year} placeholder="Vehicle Year" required type="text" name="year" id="year" className="form-control" />
                  <label htmlFor="year">Vehicle Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleColorChange} value={this.state.color} placeholder="Vehicle Color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Vehicle Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleVINChange} value={this.state.vin} placeholder="Vehicle VIN" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Vehicle VIN</label>
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

export default AutomobileForm;