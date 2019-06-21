import React, { Component } from 'react';
import axios from 'axios';
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    styler
  } from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import { Button, Form, FormGroup, Input, Col, Row, Label } from 'reactstrap';

class Rates extends Component {
    state = {
        origin: "",
        destination: "",
        fromdate: "",
        todate: "",
        data: []
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();

        const { origin, destination, fromdate, todate  } = this.state;

        console.log(fromdate, todate);

        var fD = new Date(fromdate);
        var fDate = fD.toISOString();

        var tD = new Date(todate);
        var tDate = tD.toISOString();

        console.log(fDate, tDate);

        axios.get(`/api/rates/${origin}/${destination}/${fDate}/${tDate}`)
            .then(res => {
                console.log(res.data.rates);
                this.setState({ data: res.data.rates });
            })
            .catch(err => {
                console.log(err);
            });

            this.setState({ origin: "", destination: "", fromdate: "", todate: "" });
    };


    render() {
        const series = new TimeSeries({
            name: "Rates of Shipping",
            columns: ["index", "precip"],
            points: this.state.data.map(([d, value]) => [
              Index.getIndexString("1h", new Date(d)),
              value
            ])
          });

          const style = styler([
            {
              key: "precip",
              color: "#A5C8E1",
              selected: "#2CB1CF"
            }
          ]);
        return (
            <div>
                <Form onSubmit={this.onSubmit} className="form">
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="origin">Origin</Label>
                                <Input onChange={this.handleChange}
                                    value={this.state.origin}
                                    type="text"
                                    name="origin" id="origin" placeholder="Enter origin..." />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="destination">Destination</Label>
                                <Input onChange={this.handleChange}
                                    value={this.state.destination}
                                    type="text"
                                    name="destination" id="destination" placeholder="Enter destination..." />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="froomdate">From</Label>
                                <Input onChange={this.handleChange}
                                    value={this.state.fromdate}
                                    type="date"
                                    name="fromdate" id="fromdate" max="2017-08-30" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="toodate">To</Label>
                                <Input onChange={this.handleChange}
                                    value={this.state.todate}
                                    type="date"
                                    name="todate" id="todate" min="2018-08-30" />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Button color="primary" onSubmit="" className="btn-default">Submit</Button>
                </Form>

                <div>
                    {
                        this.state.data[0] === undefined ? (
                            null
                        ) : (
                            <ChartContainer timeRange={series.timerange()} width={800}>
                                <ChartRow height="300">
                                    <YAxis
                                    id="rates"
                                    label="Rates"
                                    min={0}
                                    max={3000}
                                    format=",.2f"
                                    width="70"
                                    type="linear"
                                    />
                                    <Charts>
                                        <LineChart
                                            axis="rates"
                                            breakLine={false}
                                            style={style}
                                            columns={["precip"]}
                                            series={series}
                                            interpolation="curveBasis"
                                            />
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        )
                    }
                    
                </div>
            </div>
        )
    }
}


export default Rates

