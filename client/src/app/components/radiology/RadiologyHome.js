import React, { Component } from 'react'
import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'

class RadiologyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: null
        }
    }

    getPatient = (patient) => {
        this.setState({ patient: patient })
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
                <PatientDetails patient={this.state.patient} />
            </div>
        )
    }
}

export default RadiologyHome