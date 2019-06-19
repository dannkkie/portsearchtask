import React, { Component } from 'react'
import axios from 'axios'

class FreeSearch extends Component {
    state = {
        freesearch: "",
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()

        const { freesearch } = this.state;

    axios.get(`/api/ports/search/${freesearch}`)
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
                <h2> Free Search</h2>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.handleChange} value={this.state.freesearch} type="text" name='freesearch' placeholder="Search..."/>
                    <input onSubmit="" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}


export default FreeSearch

