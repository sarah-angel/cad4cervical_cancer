import React, { Component } from 'react'
import { Card, Typography } from 'material-ui'
import { CardContent } from 'material-ui/Card'


const styles = {
    card: {
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
            <div>
                {
                    //To-Do: make the Card collapsible to save space on the screen
                }
                <Card style={styles.card}>
                    <Typography type="title" component="h2">
                        Patient Details
                    </Typography>
                    <CardContent style={{display: "flex"}}>
                        <div style={styles.column}>
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
                        <div style={styles.column}>
                        <Typography component="p">
                            Age: {this.getAge()}
                        </Typography>
                        <Typography component="p">
                            Gender: {patient.gender}
                        </Typography>
                        <Typography component="p">
                            Blood Type: {patient.blood_type}
                        </Typography> 
                        </div>
                        <div style={styles.column}>
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
                    </CardContent>
                </Card>
                
            </div>
        )
    }
}

export default PatientDetails