import React, { Component } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Trysearch extends Component {
    state = {
        search: ""
    }
    

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    

    onSubmit = e => {
        e.preventDefault()

        const { search } = this.state;
        

    axios.get(`/api/ports/${search}`)
            .then(res => {
                console(res.data);
                // const arrName = res.data
            })
            .catch(err => {
                console.log(err);
            });
    };

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
        }
      }


    render() {

        return (
            <div className="ag-theme-balham"
            style={{ 
            height: '500px', 
            width: '800px' }}>
                <h2>search</h2>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.handleChange} value={this.state.search} type="text" name='search' placeholder="Search..."/>
                    <input onSubmit="" type="submit" value="Submit"/>
                </form>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.arrName}>
                </AgGridReact>
            </div>
        )
    }
}


export default Trysearch

