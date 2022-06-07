function SaleRecordList(props) {
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
          {props.saleRecords.map(record => {
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

export default SaleRecordList;