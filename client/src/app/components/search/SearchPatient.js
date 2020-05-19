import React, { Component } from 'react'
import { Tabs, Tab, Typography } from 'material-ui'
import  SearchBar from 'material-ui-search-bar'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon  from '@material-ui/icons/Search'

import { read } from '../../helpers/api-patient'

const styles = {
    searchBar: {
        maxWidth: 800,
        margin: 'auto',
        marginTop: 100,
        borderRadius: 18,
    },
    headers: {
        margin: 'auto'
    }
}


class SearchPatient extends Component {
    state = {
        value: '',
        error: ''
    }

    getPatient = () => {
        if ( !this.state.value )
            return

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
            <div style={{padding: 20}}>
                <div style={styles.headers}>
                    <Typography style={{textAlign: 'center'}}
                        color="primary" component="h1"
                    >
                        Cervical Cancer Diagnosis 
                    </Typography>
                </div>

                <SearchBar  
                    value={this.state.value}
                    onChange={this.handleChange}
                    onRequestSearch={this.getPatient}
                    style={styles.searchBar} 
                    searchIcon={<SearchIcon  style={{color: 'black'}} />}
                    onCancelSearch={() => this.setState({value: ''})}
                />

                {this.state.error && (
                    <Typography component="p" color="error">
                        {this.state.error}
                    </Typography>
                )}

            </div>

        )
    }
}

export default withStyles(styles)(SearchPatient)