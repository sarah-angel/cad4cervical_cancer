import React, { Component } from 'react'
import { Tabs, Tab, Typography } from 'material-ui'
import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import Consultation from './Consultation'
import History from './History'

const styles = {
    
}

class PhysiologyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: null,
            tab: 0, //current tab (Consultation)
        }
    }

    getPatient = (patient) => {
        this.setState({ patient: patient })
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }


    //To-Do: Tabs duplicated 3 times!!? Refactor

    render() {
        if ( !this.state.patient )
            return (
                <div>
                    <SearchPatient getPatient={this.getPatient} />
                </div>
            )
        
        return (
            <div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{}} > 
                        <PatientDetails patient={this.state.patient} />
                        <History patient={this.state.patient} />
                    </div>
                    <div style={{}} > 
                        <Consultation patient={this.state.patient} />
                    </div>
                </div>  
            </div>
        )
    }
}

export default PhysiologyHome