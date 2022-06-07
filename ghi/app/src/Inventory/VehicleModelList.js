function VehicleModelList(props) {
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
          {props.models.map(model => {
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

export default VehicleModelList;