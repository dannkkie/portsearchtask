import React, { Component } from 'react'
import Search from "./components/search";
import FreeSearch from './components/freesearch';
import Rates from './components/rates';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <FreeSearch />
        <Rates />
      </div>
    )
  }
}

export default  App

















