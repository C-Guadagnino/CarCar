import React from 'react';

class SalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      salesPersonName:'',
      salesPersonEmpno:'',
    };
    this.handleSalesPersonName = this.handleSalesPersonName.bind(this);
    this.handleSalesPersonEmpno = this.handleSalesPersonEmpno.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.name = data.salesPersonName;
    delete data.salesPersonName;
    data.employee_number = data.salesPersonEmpno;
    delete data.salesPersonEmpno;

    const salesPersonUrl = 'http://localhost:8090/api/salespersons/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const salesPersonPostResponse = await fetch(salesPersonUrl, fetchConfig);
    if (salesPersonPostResponse.ok) {
      const newSalesPerson = await salesPersonPostResponse.json();
      console.log(newSalesPerson);

      const cleared = {
        salesPersonName:'',
        salesPersonEmpno:'',
      };
      this.setState(cleared);
    } else {
      const jsonErrorMessage = (await salesPersonPostResponse.json()).message;
      alert(jsonErrorMessage);
    }
  }

  handleSalesPersonName(event) {
    const salesPersonNameValue = event.target.value;
    this.setState({salesPersonName: salesPersonNameValue});
  }

  handleSalesPersonEmpno(event) {
    const salesPersonEmpnoValue = event.target.value;
    this.setState({salesPersonEmpno: salesPersonEmpnoValue});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Sales Person</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleSalesPersonName} value={this.state.salesPersonName} placeholder="Sales Person Name" required type="text" name="salesPersonName" id="salesPersonName" className="form-control" />
                  <label htmlFor="salesPersonName">Sales Person Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleSalesPersonEmpno} value={this.state.salesPersonEmpno} placeholder="Sales Person Employee Number" required type="text" name="salesPersonEmpno" id="salesPersonEmpno" className="form-control" />
                  <label htmlFor="salesPersonEmpno">Sales Person Employee Number</label>
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

export default SalesPersonForm;