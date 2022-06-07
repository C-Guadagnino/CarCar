import React from 'react';

class VehicleModelList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      models: []
    };
  }

  async componentDidMount() {
    const modelsUrl = 'http://localhost:8100/api/models/';
    const modelsResponse = await fetch(modelsUrl);

    if (modelsResponse.ok) {
      const modelsData = await modelsResponse.json();
      this.setState({models: modelsData.models});
    }
  }

  render () {
    return (
      <div className="container">
        <h1>List of Vehicle Models</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Vehicle Manufacturer Name</th>
              <th>Vehicle Model Name</th>
              <th>Vehicle Picture</th>
            </tr>
          </thead>
          <tbody>
            {this.state.models.map(model => {
              return (
                <tr key={ model.id }>
                  <td>{ model.manufacturer.name }</td>
                  <td>{ model.name }</td>
                  <td><img src={ model.picture_url } height="150"/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default VehicleModelList;