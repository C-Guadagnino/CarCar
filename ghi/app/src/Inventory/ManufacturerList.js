import React from 'react';

class ManufacturerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: []
    };
  }

  async componentDidMount() {
    const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
    const manufacturersResponse = await fetch(manufacturersUrl);

    if (manufacturersResponse.ok) {
      const manufacturersData = await manufacturersResponse.json();
      this.setState({manufacturers: manufacturersData.manufacturers});
    }
  }

  render() {
    return (
      <div className="container">
        <h1>List of Manufacturers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.manufacturers.map(manufacturer => {
              return (
                <tr key={ manufacturer.id }>
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ManufacturerList;