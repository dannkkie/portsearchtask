import React, { Component } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button, Form, FormGroup, Input } from 'reactstrap';

class App extends Component {
  state = {
    search: "",
    columnDefs: [
      {
        headerName: "Ports",
        field: "id"
      },
      {
        headerName: "Country",
        field: "country"
      },
      {
        headerName: "Name",
        field: "name"
      }
    ],
    rowData: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { search } = this.state;

    axios
      .get(`/api/ports/search/${search}`)
      .then(res => {
        console.log(res.data);
        this.setState({ rowData: res.data.results });
      })
      .catch(err => {
        console.log(err);
      });

      this.setState({ search: "" });
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "200px",
          width: "500px"
        }}
      >
        <h2>search</h2>
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <Input onChange={this.handleChange}
                    value={this.state.search}
                    type="text"
                    name="search" id="search" placeholder="search port ..." />
            </FormGroup>
            <Button color="primary" onSubmit="">Submit</Button>
        </Form>

        {this.state.rowData[0] === undefined ? null : (
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
          />
        )}
      </div>
    );
  }
}

export default App;
