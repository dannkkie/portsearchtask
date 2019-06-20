import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Ports", field: "id"
      }, {
        headerName: "Country", field: "country"
      }, {
        headerName: "Name", field: "name"
      }],
    //   rowData: [{
    //     make: "Toyota", model: "Celica", price: 35000
    //   }, {
    //     make: "Ford", model: "Mondeo", price: 32000
    //   }, {
    //     make: "Porsche", model: "Boxter", price: 72000
    //   }]
        componentDidMount() {
           fetch('/api/ports/:id')
         .then(result => result.json())
         .then(rowData => this.setState({rowData}))
         }
        
    }
  }


  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '500px', 
        width: '600px' }} 
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default App;