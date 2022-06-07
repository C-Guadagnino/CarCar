import React from 'react';

class SalesPersonHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salesPersons: [],
      saleRecords: [],
      salesPerson: '',
    };
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
  }

  async handleSalesPersonChange(event) {
    const salesPersonValue = event.target.value;
    this.setState({salesPerson: salesPersonValue});

    const saleRecordUrl = 'http://localhost:8090/api/salerecords/';
    const saleRecordResponse = await fetch(saleRecordUrl);

    if (saleRecordResponse.ok) {
      const saleRecordData = await saleRecordResponse.json();

      if (this.state.salesPerson === "all") {
        this.setState({saleRecords: saleRecordData.sale_records});
      } else {
        let filteredSaleRecordList = [];
        for (const sale_record of saleRecordData.sale_records) {
          if (String(sale_record.sales_person.employee_number) === this.state.salesPerson) {
            filteredSaleRecordList.push(sale_record);
          }
        }
        this.setState({saleRecords: filteredSaleRecordList});
      }
    }
  }

  async componentDidMount() {
    const salesPersonsUrl = 'http://localhost:8090/api/salespersons/';
    const salesPersonsResponse = await fetch(salesPersonsUrl);

    if (salesPersonsResponse.ok) {
      const salesPersonsData = await salesPersonsResponse.json();
      this.setState({salesPersons: salesPersonsData.sales_persons});
    }

    const saleRecordUrl = 'http://localhost:8090/api/salerecords/';
    const saleRecordResponse = await fetch(saleRecordUrl);

    if (saleRecordResponse.ok) {
      const saleRecordData = await saleRecordResponse.json();
      this.setState({saleRecords: saleRecordData.sale_records});
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Sales Person History</h1>
        <div className="mb-3">
          <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required name="salesPerson" id="salesPerson" className="form-select">
            <option value="all">Choose a Sales Person (Showing all by default)</option>
            {this.state.salesPersons.map(salesPerson => {
              return (
                <option key={salesPerson.employee_number} value={salesPerson.employee_number}>
                  {salesPerson.name} - Emp #{salesPerson.employee_number}
                </option>
              )
            })}
          </select>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sales Person</th>
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

export default SalesPersonHistory;