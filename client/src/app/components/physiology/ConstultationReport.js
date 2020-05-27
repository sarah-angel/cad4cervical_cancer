import React, { Component } from 'react'
import { Typography, Tabs, Tab , Button, Chip } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import LabReport from '../lab/LabReport'
import { getByConsultationID } from '../../helpers/api-lab'

const styles = {
    root: {
        maxWidth: 800,
        margin: 'auto',
        //width: 800,
        minWidth: 300,
        padding: 20,
        marginBottom: 20,
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    field: {
        width: '40%', 
        minWidth: 200, 
        marginBottom: 20
    },
}

class ConsultationReport extends Component {
    state = {
        report: this.props.report,
        labTest: null,
        tab: 0,
    }

    handleTabChange = (event, value) => {
        this.setState({tab: value})
    }

    getLabReport = (consultation_ID) => {
        getByConsultationID(consultation_ID).then((data) => {
            if( !data ){
                this.setState({labTest: null})
                return
            } 

            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({labTest: data})
            }
        })
    }

    componentDidMount(){
        this.setState({report: this.props.report})
        this.getLabReport(this.props.report._id)
    }

    componentDidUpdate(){
        if (this.state.report !== this.props.report){
            this.setState({report: this.props.report})
            this.getLabReport(this.props.report._id)
        }

    }

    getDateString = (date) => {
        let dateObj = new Date(date)
        return dateObj.getDate() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear()
                    
    }
    render(){
        return(
            <div style={styles.root}>
                <div style={styles.reportHead}>
                    <Button color="primary" 
                        onClick={() => this.props.setViewReportIndex(null)}>
                        <ArrowBackIcon/>
                        &nbsp;Back
                    </Button>
                    <span style={{float: "right"}}>{this.getDateString(this.state.report.created)}</span>
                </div>

                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >              
                    <Tab label="Consultation" />
                    <Tab label="Lab Test" />
                    <Tab label="Diagnosis" />
                </Tabs>
                
                <br/>

                {this.state.tab === 0 && (
                <div style={{padding: 20, marginLeft: 20}}>
                    <div style={styles.row}>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Weight (Kg) 
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.weight ? this.state.report.weight : 'n/a'}
                            </Typography>
                        </span>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Height (cm) 
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.height ? this.state.report.height : 'n/a'}
                            </Typography>
                        </span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Temperature (°C) 
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.temperature ? this.state.report.temperature : 'n/a'}
                            </Typography>
                        </span>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Children
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.children ? this.state.report.children : 'n/a'}
                            </Typography>
                        </span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Family History 
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.family_history ? 'Yes' : 'No'}
                            </Typography>
                        </span>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Smokes
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.smokes ? 'Yes' : 'No'}
                            </Typography>
                        </span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Alcohol
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.alcohol ? 'Yes' : 'No'}
                            </Typography>
                        </span>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Symptom Duration
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {this.state.report.symptom_duration ? this.state.report.symptom_duration : 'n/a'}
                            </Typography>
                        </span>
                    </div>
                    <div style={styles.row}>
                        <span style={{}}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Symptoms
                            </Typography>
                            <span style={{display: 'flex', flexWrap: 'wrap'}}>
                                {this.state.report && this.state.report.symptoms && this.state.report.symptoms.length
                                    ? this.state.report.symptoms.map((symptom, index) => 
                                        <Chip label={symptom} style={{margin: 5}} />)
                                    : 'n/a'
                                }
                            </span>
                            
                        </span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                                Existing Conditions
                            </Typography>
                                {this.state.report && this.state.report.existing_conditions && this.state.report.existing_conditions.length
                                    ? this.state.report.existing_conditions.map((condition, index) => 
                                        <Chip label={condition} style={{margin: 5}} />)
                                    : 'n/a'
                                }
                        </span>
                    </div>
                </div>
                )}

                {this.state.tab === 1 && (
                <div style={{marginLeft: 20}}>
                    {this.state.labTest && 
                        <LabReport labTest={this.state.labTest}/>
                    }
                </div>
                )}

                {this.state.tab === 2 && (
                <div style={{marginLeft: 20, padding: 20}}>
                    <div style={styles.row}>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14}}>
                                Cervical Cancer
                            </Typography>
                            <Typography>
                                {this.state.report.diagnosis.diagnosis ? 'Positive' : 'Negative'}
                            </Typography>
                        </span>
                        <span style={styles.field}>
                            <Typography style={{color: 'grey', fontSize: 14}}>
                                Confidence
                            </Typography>
                            <Typography style={{}}>
                                {this.state.report.diagnosis.confidence ? this.state.report.diagnosis.confidence + '%' : 'n/a'}
                            </Typography>
                        </span>
                    </div>
                    <div>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Clinical Notes
                        </Typography>
                        <Typography>
                            lwjdkjklalsdlasasdlsldlsdll
                        </Typography>

                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default ConsultationReport