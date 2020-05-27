import React, { Component } from 'react'
import { Tabs, Tab, Typography } from 'material-ui'
import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import LabTest from './LabTest'

class LabHome extends Component {
    state = {
        patient: null,
        tab: 0

    }

    getPatient = (patient) => {
        this.setState({ patient: patient })
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }

    render() {
        if ( !this.state.patient )
            return (
                <div>
                    <SearchPatient getPatient={this.getPatient} />
                </div>
            )
        
            return (
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{flex: 1, maxWidth: 300}} > 
                        <PatientDetails patient={this.state.patient} />
                    </div>
                    <div style={{flex: 1, justifyContent: 'center'}} > 
                        <LabTest patient={this.state.patient} />
                    </div>
                </div>     
            )
    }
}

export default LabHome