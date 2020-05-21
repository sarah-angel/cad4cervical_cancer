import React, { Component } from 'react'
import { Card, Typography, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = {
    root: {
        maxWidth: 300,
        margin: 'auto',
        padding: 20,
    },
    expandBtn: {
        textTransform: 'none', 
        position: 'relative', 
        left: '50%', 
        transform: 'translate(-50%, 0)',
    },
}


class PatientDetails extends Component{
    state = {
        expand: false,
    }

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
                    <Typography style={styles.title} >
                        Patient Details
                    </Typography>
                    
                    <div style={{marginLeft: 0, justifyContent: 'center'}}>
                        <div style={{display: 'flex'}} >
                            <span>
                                <AccountCircleIcon 
                                    style={{fontSize: 100, color: 'grey', marginLeft: -10}} 
                                />
                            </span>
                            <span style={{marginTop: 10}}>
                                <Typography style={{}}>
                                    {patient.firstname} {patient.middlename} {patient.surname}
                                </Typography>

                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Patient ID
                                </Typography>
                                <Typography >
                                     {patient._id}
                                </Typography>
                            </span>
                        </div>

                        <div style={{display: 'flex', marginLeft: 10}} >
                            <span style={{marginRight: 70}}>
                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Age
                                </Typography>
                                <Typography >
                                    {this.getAge()} Yrs
                                </Typography>
                            </span>
                            <span>
                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Gender
                                </Typography>
                                <Typography >
                                    {patient.gender}
                                </Typography>
                            </span>
                        </div>

                        { this.state.expand ? 
                        (<div>
                        <div style={{display: 'flex', marginLeft: 10}} >
                            <span style={{marginRight: 70}}>
                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Blood Type
                                </Typography>
                                <Typography >
                                    {patient.blood_type}
                                </Typography>
                            </span>
                            <span>
                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Occupation
                                </Typography>
                                <Typography >
                                    {patient.occupation}
                                </Typography>
                            </span>
                        </div>
                        <div style={{display: 'flex', marginLeft: 10}} >
                            <span style={{marginRight: 70}}>
                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Nationality
                                </Typography>
                                <Typography >
                                    {patient.nationality}
                                </Typography>
                            </span>
                            <span>
                                <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                    Residence
                                </Typography>
                                <Typography >
                                    {patient.region}
                                </Typography>
                            </span>
                        </div>
                            <div style={{display: 'flex', marginLeft: 10}} >
                                <span style={{marginRight: 70}}>
                                    <Typography style={{color: 'grey', fontSize: 14, marginTop: 10}} >
                                        Marital Status
                                    </Typography>
                                    <Typography >
                                        {patient.marital_status}
                                    </Typography>
                                </span>  
                            </div> 

                            <Button color="primary" onClick={() => this.setState({expand: false})}
                                style={styles.expandBtn}
                                endIcon={<ExpandLessIcon />} 
                            >
                                View Less
                            </Button>
                        </div>
                        ) : (

                        <Button color="primary" onClick={() => this.setState({expand: true})}
                            style={styles.expandBtn}
                            endIcon={<ExpandMoreIcon />} 
                        >
                            View More
                        </Button>
                        )}
                        
                    </div>
            </div>
        )
    }
}

export default PatientDetails