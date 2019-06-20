import React, { Component } from 'react'


//COMPONENTS
import Search from "./components/search";
import FreeSearch from './components/freesearch';
import Rates from './components/rates';
import Searches from './components/searches';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <Searches />
        <FreeSearch />
        <Rates />
      </div>
    )
  }
}

export default  App

















