import React from 'react';

class SaleRecordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleRecords: []
    };
  }

  async componentDidMount() {
    const saleRecordsUrl = 'http://localhost:8090/api/salerecords/';
    const saleRecordsResponse = await fetch(saleRecordsUrl);

    if (saleRecordsResponse.ok) {
      const saleRecordsData = await saleRecordsResponse.json();
      this.setState({saleRecords: saleRecordsData.sale_records});
    }
  }

  render() {
    return (
      <div className="container">
        <h1>All Sale Records</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sales Person Name</th>
              <th>Sales Person Employee Number</th>
              <th>Purchaser's Name</th>
              <th>Automobile VIN</th>
              <th>Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.saleRecords.map(record => {
              return (
                <tr key={ record.pk }>
                  <td>{ record.sales_person.name }</td>
                  <td>{ record.sales_person.employee_number }</td>
                  <td>{ record.customer.name }</td>
                  <td>{ record.automobile.vin }</td>
                  <td>${ record.price.toLocaleString() }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SaleRecordList;