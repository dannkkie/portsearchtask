import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'

class Search extends Component {
    state = {
        search: ""
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onClick = e => {
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
                <form onClick={this.onClick}>
                    <input onChange={this.handleChange} value={this.state.search} type="text" name='search' placeholder="Search..."/>
                    {/* <input onSubmit="" type="submit" value="Submit"/> */}
                    <Button color="primary" onClick="" >Search</Button>
                </form>
            </div>
        )
    }
}


export default Search

