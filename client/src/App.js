import React, { Component } from 'react'
import Search from "./components/search";
import FreeSearch from './components/freesearch';
import Rates from './components/rates';
import Trysearch from './components/trysearch';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <Trysearch />
        <FreeSearch />
        <Rates />
      </div>
    )
  }
}

export default  App

















