function ManufacturerList(props) {
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
          {props.manufacturers.map(manufacturer => {
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

export default ManufacturerList;