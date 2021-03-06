import React from 'react';

class AutomobileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      automobiles: []
    };
  }

  async componentDidMount() {
    const automobilesUrl = 'http://localhost:8100/api/automobiles/';
    const automobilesResponse = await fetch(automobilesUrl);

    if (automobilesResponse.ok) {
      const automobilesData = await automobilesResponse.json();
      this.setState({automobiles: automobilesData.autos});
    }
  }

  render() {
    return (
      <div className="container">
        <h1>List of Automobiles</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Vehicle Manufacturer Name</th>
              <th>Vehicle Model Name</th>
              <th>Vehicle Year</th>
              <th>Vehicle Color</th>
              <th>Vehicle VIN</th>
            </tr>
          </thead>
          <tbody>
            {this.state.automobiles.map(auto => {
              return (
                <tr key={ auto.vin }>
                  <td>{ auto.model.manufacturer.name }</td>
                  <td>{ auto.model.name }</td>
                  <td>{ auto.year }</td>
                  <td>{ auto.color }</td>
                  <td>{ auto.vin }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AutomobileList;