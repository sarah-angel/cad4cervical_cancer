import React, { Component } from 'react'
import  SearchBar from 'material-ui-search-bar'

class SearchPatient extends Component {
    state = {
        value: ''
    }
    
    render() {
        return (
            <SearchBar 
                value={this.state.value}
                onChange={(search) => this.setState({value: search})}
                onRequestSearch={() => console.log('search requested')}
                stye={{margin: '0 auto',
                        maxWidth: 800}} />
        )
    }
}

export default SearchPatient