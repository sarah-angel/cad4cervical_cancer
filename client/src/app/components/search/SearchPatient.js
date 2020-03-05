import React, { Component } from 'react'
import  SearchBar from 'material-ui-search-bar'
import { read } from '../../helpers/api-patient'
import { Typography } from 'material-ui'

class SearchPatient extends Component {
    state = {
        value: '',
        error: ''
    }

    getPatient = () => {
        read({
            patientId: this.state.value
        }).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else
                this.props.getPatient(data)
        })
    }

    handleChange = (search) => {
        this.setState({value: search})
    }

    render() {
        return (
            <div>
            <SearchBar 
                value={this.state.value}
                onChange={this.handleChange}
                onRequestSearch={this.getPatient}
                stye={{margin: '0 auto',
                maxWidth: 800}} />

            {this.state.error && (
                <Typography component="p" color="error">
                    {this.state.error}
                </Typography>
            )}

            </div>

        )
    }
}

export default SearchPatient