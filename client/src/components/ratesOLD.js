import React, { Component } from 'react'
import axios from 'axios'

class Rates extends Component {
    state = {
        origin: "",
        destination: "",
        fromdate: "",
        todate: ""
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()

        const { origin, destination, fromdate, todate  } = this.state;

        console.log(fromdate, todate);

        var fD = new Date(fromdate);
        var fDate = fD.toISOString();

        var tD = new Date(todate);
        var tDate = tD.toISOString();

        console.log(fDate, tDate);

    axios.get(`/api/rates/${origin}/${destination}/${fDate}/${tDate}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {

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
            </div>
        )
    }
}


export default Rates

