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
                <h2>Rates Time Series</h2>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.handleChange} value={this.state.origin} type="text" name='origin' placeholder="Search origin..."/>
                    <input onChange={this.handleChange} value={this.state.destination} type="text" name='destination' placeholder="Search destination..."/>
                    <input onChange={this.handleChange} value={this.state.fromdate} type="date" name="fromdate" max="2017-08-30" />
                    <input onChange={this.handleChange} value={this.state.todate} type="date" name="todate" min="2018-06-30" /> 
                    <input onSubmit="" type="submit" value="Submit"/>
                </form>

                <div>
                    {
                        this.state.data[0] === undefined ? (
                            null
                        ) : (
                            <ChartContainer timeRange={series.timerange()} width={800}>
                                <ChartRow height="400">
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

