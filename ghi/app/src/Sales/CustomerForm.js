import React from 'react';

class SalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      customerName:'',
      customerAddress:'',
      customerPhone:'',
    };
    this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
    this.handleCustomerAddressChange = this.handleCustomerAddressChange.bind(this);
    this.handleCustomerPhoneChange = this.handleCustomerPhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.name = data.customerName;
    delete data.customerName;
    data.address = data.customerAddress;
    delete data.customerAddress;
    data.phone_number = data.customerPhone;
    delete data.customerPhone;

    const customerUrl = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const customerPostResponse = await fetch(customerUrl, fetchConfig);
    if (customerPostResponse.ok) {
      const newCustomer = await customerPostResponse.json();
      console.log(newCustomer);

      const cleared = {
        customerName:'',
        customerAddress:'',
        customerPhone:'',
      };
      this.setState(cleared);
    }

  }

  handleCustomerNameChange(event) {
    const customerNameValue = event.target.value;
    this.setState({customerName: customerNameValue});
  }

  handleCustomerAddressChange(event) {
    const customerAddressValue = event.target.value;
    this.setState({customerAddress: customerAddressValue});
  }

  handleCustomerPhoneChange(event) {
    const customerPhoneValue = event.target.value;
    this.setState({customerPhone: customerPhoneValue});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Potential Customer</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleCustomerNameChange} value={this.state.customerName} placeholder="Customer Name" required type="text" name="customerName" id="customerName" className="form-control" />
                  <label htmlFor="customerName">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleCustomerAddressChange} value={this.state.customerAddress} placeholder="Customer Address" required type="text" name="customerAddress" id="customerAddress" className="form-control" />
                  <label htmlFor="customerAddress">Customer Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleCustomerPhoneChange} value={this.state.customerPhone} placeholder="Customer Phone Number" required type="tel" name="customerPhone" id="customerPhone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control" />
                  <label htmlFor="customerPhone">Customer Phone Number (123-456-7890)</label>
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