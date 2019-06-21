import React, { Component } from 'react'


//COMPONENTS
import Rates from './components/rates';
import  './App.css';

import { Jumbotron, Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="over body-content">
        <section className="over jumb">
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Xeneta Port to Port Search</h1>
              <p className="lead">Input the origin of a port and the destination and select date ranges to create time series.</p>
            </Container>
          </Jumbotron>
        </section>
        {/* <Row>
          <Col sm={{ size: 'auto', offset: 1 }}><Search /></Col>
          <Col sm={{ size: 'auto', offset: 1 }}><FreeSearch /></Col>
        </Row> */}
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}><Rates /></Col>
        </Row>
      </div>
    )
  }
}

export default  App

















