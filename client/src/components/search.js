import React, { Component } from 'react'
import axios from 'axios'

class Search extends Component {
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
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {

        return (
            <div>
                <h2>search</h2>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.handleChange} value={this.state.search} type="text" name='search' placeholder="Search..."/>
                    <input onSubmit="" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}


export default Search

