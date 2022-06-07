import React from 'react';

class SalesPersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      automobiles:[],
      salesPersons:[],
      customers:[],
      automobile:'',
      salesPerson:'',
      customer:'',
      price: '',
    };
    this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.sales_person = data.salesPerson;
    delete data.salesPerson;
    delete data.automobiles;
    delete data.salesPersons;
    delete data.customers;

    const saleRecordUrl = 'http://localhost:8090/api/salerecords/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const saleRecordPostResponse = await fetch(saleRecordUrl, fetchConfig);
    if (saleRecordPostResponse.ok) {
      const newSaleRecord = await saleRecordPostResponse.json();
      console.log(newSaleRecord);

      /* Puts together latest list of autos without a Sale Record
      for the purpose of populating "Choose an Automobile" dropdown,
      specifically excluding the auto whose salerecord was just created.
      Note: (Why below code should NOT be changed to just update state)
      Assuming more than 1 browser page will be used
      to create salerecords at a time (e.g. 2+ sales people), the
      implementation should NOT just update state to exclude the auto
      whose salerecord was just created, without making new API call.
      Otherwise, 2+ sales people (i.e. using 2+ different browser pages)
      will have outdated/inaccurate automobiles data in dropdown, showing
      an auto for which another sales person already created a salerecord,
      unless page is refreshed/reloaded after each salerecord creation.*/
      const automobilesUrl = 'http://localhost:8100/api/automobiles/';
      const automobilesResponse = await fetch(automobilesUrl);
      const automobilesWithoutSaleRecord = [];

      if (automobilesResponse.ok) {
        const automobilesData = await automobilesResponse.json();

        const saleRecordUrl = 'http://localhost:8090/api/salerecords/';
        const saleRecordsResponse = await fetch(saleRecordUrl);

        if (saleRecordsResponse.ok) {
          const saleRecordsData = await saleRecordsResponse.json();

          const vinsWithSaleRecord = [];
          for (const sale_record of saleRecordsData.sale_records) {
            vinsWithSaleRecord.push(sale_record.automobile.vin);
          }

          for (const automobile of automobilesData.autos) {
            if (!(vinsWithSaleRecord.includes(automobile.vin))) {
              automobilesWithoutSaleRecord.push(automobile)
            }
          }

          this.setState({automobiles: automobilesWithoutSaleRecord});
        }
      }

      const reset = {
        automobile:'',
        salesPerson:'',
        customer:'',
        price: '',
        automobiles: automobilesWithoutSaleRecord,
      };
      this.setState(reset);
    } else {
      const jsonErrorMessage = (await saleRecordPostResponse.json()).message
      alert(jsonErrorMessage);
    }
  }

  handleAutomobileChange(event) {
    const automobileValue = event.target.value;
    this.setState({automobile: automobileValue});
  }

  handleSalesPersonChange(event) {
    const salesPersonValue = event.target.value;
    this.setState({salesPerson: salesPersonValue});
  }

  handleCustomerChange(event) {
    const customerValue = event.target.value;
    this.setState({customer: customerValue});
  }

  handlePriceChange(event) {
    const priceValue = event.target.value;
    this.setState({price: priceValue});
  }

  async componentDidMount() {
    // Populates the "Choose an Automobile" dropdown
    // with autos that don't have a Sale Record
    const automobilesUrl = 'http://localhost:8100/api/automobiles/';
    const automobilesResponse = await fetch(automobilesUrl);

    if (automobilesResponse.ok) {
      const automobilesData = await automobilesResponse.json();

      // Get the list of Sale Records to filter
      // by the Automobiles that don't have a Sale Record
      const saleRecordUrl = 'http://localhost:8090/api/salerecords/';
      const saleRecordsResponse = await fetch(saleRecordUrl);

      if (saleRecordsResponse.ok) {
        const saleRecordsData = await saleRecordsResponse.json();

        const vinsWithSaleRecord = [];
        for (const sale_record of saleRecordsData.sale_records) {
          vinsWithSaleRecord.push(sale_record.automobile.vin);
        }

        const automobilesWithoutSaleRecord = [];
        for (const automobile of automobilesData.autos) {
          if (!(vinsWithSaleRecord.includes(automobile.vin))) {
            automobilesWithoutSaleRecord.push(automobile)
          }
        }

        this.setState({automobiles: automobilesWithoutSaleRecord});
      }
    }

    // Populates the "Choose a Sales Person" dropdown
    const salesPersonsUrl = 'http://localhost:8090/api/salespersons/';
    const salesPersonsResponse = await fetch(salesPersonsUrl);

    if (salesPersonsResponse.ok) {
      const salesPersonsData = await salesPersonsResponse.json();
      this.setState({salesPersons: salesPersonsData.sales_persons});
    }

    // Populates the "Choose a Customer" dropdown
    const customersUrl = 'http://localhost:8090/api/customers/';
    const customersResponse = await fetch(customersUrl);

    if (customersResponse.ok) {
      const customersData = await customersResponse.json();
      this.setState({customers: customersData.customers});
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Sale Record</h1>
              <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="mb-3">
                  <select onChange={this.handleAutomobileChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                    <option value="">Choose an Automobile</option>
                    {this.state.automobiles.map(auto => {
                      return (
                        <option key={auto.id} value={auto.vin}>
                          {auto.vin} - {auto.year} {auto.color} {auto.model.manufacturer.name} {auto.model.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required name="salesPerson" id="salesPerson" className="form-select">
                    <option value="">Choose a Sales Person</option>
                    {this.state.salesPersons.map(salesPerson => {
                      return (
                        <option key={salesPerson.employee_number} value={salesPerson.employee_number}>
                          {salesPerson.name} (Employee #{salesPerson.employee_number})
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleCustomerChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                    <option value="">Choose a Customer</option>
                    {this.state.customers.map(customer => {
                      return (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} (Phone #: {customer.phone_number})
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Sale Price" required type="number" name="price" id="price" className="form-control" />
                  <label htmlFor="price">Sale Price</label>
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