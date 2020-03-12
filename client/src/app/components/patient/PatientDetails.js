import React, { Component } from 'react'
import { Card, Typography, Box } from '@material-ui/core'
import { CardContent } from 'material-ui/Card'


const styles = {
    root: {
        maxWidth: 800,
        margin: 'auto'
    },
    column: {
        width: '30%'
    }
}


class PatientDetails extends Component{
    
    getAge = () => {
        var today = new Date()
        var birthdate = new Date(this.props.patient.date_of_birth)
        var age = today.getFullYear() - birthdate.getFullYear()
        var m = today.getMonth() - birthdate.getMonth()
        if(m < 0 || (m === 0 && today.getDate() < birthdate.getDate()))
            age--
        return age
    }

    render() {
        const patient = this.props.patient

        return (
            <div style={styles.root}>
                {
                    //To-Do: make the Card collapsible to save space on the screen
                }
                    <Typography style={styles.title}>
                        Patient Details
                    </Typography>
                    <Box borderBottom={1} style={styles.bottomBorder} color="text.disabled" />
                    
                    <CardContent style={{display: "flex"}}>
                        <div style={styles.column}>
                           <Typography >
                            First Name: {patient.firstname}
                        </Typography>
                        <Typography >
                            Middle Name: {patient.middlename}
                        </Typography>
                        <Typography >
                            Last Name: {patient.surname}
                        </Typography> 
                        </div>
                        <div style={styles.column}>
                        <Typography >
                            Age: {this.getAge()}
                        </Typography>
                        <Typography >
                            Gender: {patient.gender}
                        </Typography>
                        <Typography >
                            Blood Type: {patient.blood_type}
                        </Typography> 
                        </div>
                        <div style={styles.column}>
                        <Typography >
                            Occupation: {patient.occupation}
                        </Typography>
                        <Typography >
                            Nationality: {patient.nationality}
                        </Typography>
                        <Typography >
                            Residence: {patient.residence}
                        </Typography> 
                        <Typography >
                            Marital Status: {patient.marital_status}
                        </Typography> 
                        </div>
                    </CardContent>
                
            </div>
        )
    }
}

export default PatientDetails