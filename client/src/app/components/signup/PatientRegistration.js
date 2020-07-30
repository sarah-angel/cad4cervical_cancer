import React, { Component } from 'react'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField, Dialog, Typography, MenuItem } from '@material-ui/core'
import { DialogTitle, DialogActions } from 'material-ui/Dialog'
import Icon from 'material-ui/Icon'
import { Alert } from '@material-ui/lab'

import { registerPatient } from '../../helpers/api-admin'

const styles = {
    card: {
        maxWidth: 400,
        margin: 'auto',
        textAlign: 'center',
        marginTop: 10,
        padding: 20,
        borderRadius: 5,
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textField: {
        width: '100%',
        marginBottom: 0,
        textAlign: "left"
    },
    submit: {
        margin: 'auto',
        marginLeft: 10,
        marginRight: 10,
        width: '100%',
    }
}

const genders = [
    { 
        value: "Female",
        label: "Female"
    },
    { 
        value: "Male",
        label: "Male"
    }
]

const bloodTypes = [
    { 
        value: "A+",
        label: "A+"
    },
    { 
        value: "A-",
        label: "A-"
    },
    { 
        value: "B+",
        label: "B+"
    },
    { 
        value: "B-",
        label: "B-"
    },
    { 
        value: "O+",
        label: "O+"
    },
    { 
        value: "O-",
        label: "O-"
    },
    { 
        value: "AB+",
        label: "AB+"
    },
    { 
        value: "AB-",
        label: "AB-"
    }
]

const maritalStatuses = [
    { 
        value: "Single",
        label: "Single"
    },
    { 
        value: "Married",
        label: "Married"
    },
    { 
        value: "Widowed",
        label: "Widowed"
    },
    { 
        value: "Divorced",
        label: "Divorced"
    },
    { 
        value: "Separated",
        label: "Separated"
    }
]
class PatientRegistration extends Component{
    state = {
        username: '',
        firstname: '',
        middlename: '',
        surname: '',
        date_of_birth: null,
        gender: '',
        blood_type: '',
        occupation: '',
        nationality: 'Tanzanian',
        residence: '',
        marital_status: '',
        open: false,
        error: '',
        success: ''
    }
    

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    clickSubmit = () => {

        if (!this.state.firstname || !this.state.surname || !this.state.date_of_birth ){
            this.setState({error: "Please fill in all required fields"})
            return
        }

        const patient = {
            firstname: this.state.firstname,
            middlename: this.state.middlename || undefined,
            surname: this.state.surname,
            date_of_birth: this.state.date_of_birth,
            gender: this.state.gender,
            blood_type: this.state.blood_type,
            occupation: this.state.occupation,
            nationality: this.state.nationality,
            residence: this.state.residence,
            marital_status: this.state.marital_status
        }
        
        registerPatient(patient).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else {
                this.setState({
                    success: 'Account created successfully',
                    firstname: '',
                    middlename: '',
                    surname: '',
                    date_of_birth: '',
                    gender: '',
                    blood_type: '',
                    occupation: '',
                    nationality: '',
                    residence: '',
                    marital_status: ''
                })
            }
        })
    }

    render() {
        return (
            <div>

                {this.state.error && 
                    <Alert severity="error" style={{width: "60%", margin: "auto", marginTop: 20}}
                        onClose={() => this.setState({error: null})}
                    >
                        {this.state.error}
                    </Alert>
                }

                {this.state.success && 
                    <Alert severity="success" style={{width: "60%", margin: "auto", marginTop: 20}}
                        onClose={() => this.setState({success: null})}
                    >
                        {this.state.success}
                    </Alert>
                }

                <Card style={styles.card}>
                    <CardContent>
                        {/* <Typography color="primary" component="h2" style={styles.title}>
                            Create Account
                        </Typography> */}

                        <TextField id="firstname" label="First Name" variant="outlined"
                                    onChange={this.handleChange('firstname')} value={this.state.firstname}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="middlename" label="Middle Name" variant="outlined"
                                    onChange={this.handleChange('middlename')} value={this.state.middlename}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="surname" label="Surname" variant="outlined"
                                    onChange={this.handleChange('surname')} value={this.state.surname}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="date_of_birth" label="Date of Birth" variant="outlined"
                                    onChange={this.handleChange('date_of_birth')} type='date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal" value={this.state.date_of_birth} style={styles.textField} /> <br/>
                        <TextField id="gender" label="Gender" variant="outlined"
                                    onChange={this.handleChange('gender')} select
                                    margin="normal" value={this.state.gender} style={styles.textField} 
                        >
                                 {genders.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                ))}       
                        </TextField> <br/>
                        <TextField id="blood_type" label="Blood Type" variant="outlined"
                                    onChange={this.handleChange('blood_type')} select
                                    margin="normal" value={this.state.blood_type} style={styles.textField} 
                        >
                                {bloodTypes.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                        </TextField> <br/>
                        <TextField id="occupation" label="Occupation" variant="outlined"
                                    onChange={this.handleChange('occupation')}
                                    margin="normal" value={this.state.occupation} style={styles.textField} /> <br/>
                        <TextField id="nationality" label="Nationality" variant="outlined"
                                    onChange={this.handleChange('nationality')}
                                    margin="normal" value={this.state.nationality} style={styles.textField} /> <br/>
                        <TextField id="residence" label="Residence" variant="outlined"
                                    onChange={this.handleChange('residence')}
                                    margin="normal" value={this.state.residence} style={styles.textField} /> <br/>
                        <TextField id="marital_status" label="Marital Status" variant="outlined"
                                    onChange={this.handleChange('marital_status')} select
                                    margin="normal" value={this.state.marital_status} style={styles.textField} 
                        >
                                {maritalStatuses.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                        </TextField> <br/>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained"
                                onClick={this.clickSubmit} style={styles.submit} >
                            Register
                        </Button>
                    </CardActions>
                </Card>

                <Dialog open={this.state.open}> 
                    <DialogTitle>
                        New Account Successfully Created
                    </DialogTitle>
                    <DialogActions style={{alignContent: 'center'}}>
                        <Button color="primary" style={{alignSelf: 'center'}}
                            onClick={() => this.setState({open: false})}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default PatientRegistration