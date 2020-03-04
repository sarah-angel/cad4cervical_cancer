import React, { Component } from 'react'
import  SearchBar from 'material-ui-search-bar'
import { read } from '../../helpers/api-patient'

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


    render() {
        return (
            <SearchBar 
                value={this.state.value}
                onChange={(search) => this.setState({value: search})}
                onRequestSearch={this.getPatient}
                stye={{margin: '0 auto',
                        maxWidth: 800}} />
        )
    }
}

export default SearchPatient