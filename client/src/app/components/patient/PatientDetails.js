import React, { Component } from 'react'
import { Tabs, Tab, Card, Typography } from 'material-ui'
import { CardContent } from 'material-ui/Card'


const styles = {
    
}

class PatientDetails extends Component{
    state = {
        tab: 0 //first tab
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }

    render() {
        const patient = this.props.patient

        return (
            <div>
                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Consultation" />
                    <Tab label="History" />
                </Tabs>

                <Card>
                    <Typography type="title" component="h2">
                        Patient Details
                    </Typography>
                    <CardContent>
                        <div style={{float: "left"}}>
                           <Typography component="p">
                            First Name: {patient.firstname}
                        </Typography>
                        <Typography component="p">
                            Middle Name: {patient.middlename}
                        </Typography>
                        <Typography component="p">
                            Last Name: {patient.surname}
                        </Typography> 
                        </div>
                        <div style={{float: "right"}}>
                        <div style={{float: "left"}}>
                        <Typography component="p">
                            Date of Birth: {patient.date_of_birth}
                        </Typography>
                        <Typography component="p">
                            Gender: {patient.gender}
                        </Typography>
                        <Typography component="p">
                            Blood Type: {patient.blood_type}
                        </Typography> 
                        </div>
                        <div style={{float: "right", marginLeft: 200}}>
                        <Typography component="p">
                            Occupation: {patient.occupation}
                        </Typography>
                        <Typography component="p">
                            Nationality: {patient.nationality}
                        </Typography>
                        <Typography component="p">
                            Place of Residence: {patient.residence}
                        </Typography> 
                        <Typography component="p">
                            Marital Status: {patient.marital_status}
                        </Typography> 
                        </div>
                        </div>
                    </CardContent>
                </Card>
                
            </div>
        )
    }
}

export default PatientDetails