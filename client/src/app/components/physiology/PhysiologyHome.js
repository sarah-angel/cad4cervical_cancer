import React, { Component } from 'react'
import { Tabs, Tab, Typography } from 'material-ui'

import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import Consultation from './Consultation'
import History from './History'
import ConsultationReport from './ConstultationReport'
import { getHistory } from '../../helpers/api-consultation'

const styles = {
    
}

class PhysiologyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: null,
            history: null,
            viewReportIndex: null,
            viewReport: null,
            tab: 0, //current tab (Consultation)
        }
    }

    getPatient = (patient) => {
        this.setState({ patient: patient })

        getHistory(patient._id).then((data) => {
            if (data.error)
                this.setState({error: data.error})
            else{
                this.setState({history: data})
            }
        })
    }

    setViewReportIndex = (index) => {
        //this.setState({viewReportIndex: index})
        
        if (index != null)
            this.setState({viewReport: this.state.history[index]})
        else
            this.setState({viewReport: null})
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
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{}} > 
                        <PatientDetails patient={this.state.patient} />
                        {this.state.history && 
                            <History history={this.state.history} 
                                setViewReportIndex={this.setViewReportIndex} 
                            />
                        }
                    </div>
                    <div style={{}} > 
                        {this.state.viewReport
                            ? (
                                <ConsultationReport report={this.state.viewReport} 
                                    setViewReportIndex={this.setViewReportIndex}
                                />
                            ):(
                                <Consultation patient={this.state.patient} />
                            )
                        }
                    </div>
                </div>  
            </div>
        )
    }
}

export default PhysiologyHome