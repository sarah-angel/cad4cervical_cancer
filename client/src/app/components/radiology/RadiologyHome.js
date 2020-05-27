import React, { Component } from 'react'
import { Tabs, Tab, Typography } from 'material-ui'
import { CardContent, CardMedia } from 'material-ui/Card'
import { findDOMNode } from 'react-dom'

import uploadImg from '../../../assets/images/upload-big-arrow.png'
import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import { getHistory } from '../../helpers/api-radiology'
import Assessment from './Assessment'
import History from '../physiology/History'
import AssessmentReport from './AssessmentReport'

const styles = {
    uploadCard: {
        maxWidth: 800,
        margin: 'auto',
        marginTop: 50,
        textAlign: "center",
        borderStyle: 'none'
    },
    uploadMedia: {
        minHeight: 100,
        width: 100,
        margin: '0 auto'
    }
}

class RadiologyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: null,
            history: null,
            viewReportIndex: null,
            viewReport: null,
            image: null,
            tab: 0, //current tab (Consultation)
        }
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
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
                    <div style={{flex: 1, maxWidth: 300}} > 
                        <PatientDetails patient={this.state.patient} />
                        {this.state.history && 
                            <History history={this.state.history} 
                                setViewReportIndex={this.setViewReportIndex} 
                            />
                        }
                    </div>
                    <div style={{flex: 1, justifyContent: 'center'}} > 
                        {this.state.viewReport 
                            ? <AssessmentReport report={this.state.viewReport}
                                setViewReportIndex={this.setViewReportIndex}
                                />
                            : <Assessment patient={this.state.patient} />
                        }
                    </div>
                </div>  
                {
                    //show loading animation when waiting for response
                }
                
                
            </div>
        )

      
    }
}

export default RadiologyHome