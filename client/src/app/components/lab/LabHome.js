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
                <div>
                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >              
                    <Tab label="Lab Test" />
                    <Tab label="History" />
                </Tabs>
            
                {this.state.tab === 1 
                ? (
                    <div>
                        History Section              
                    </div>
                ) : (
                    <div>
    
                        <PatientDetails patient={this.state.patient} />
                        <LabTest patient={this.state.patient} />
                    </div>
                ) } 
     
                </div>
            )
    }
}

export default LabHome