import React, { Component } from 'react'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField, Dialog, Typography } from '@material-ui/core'
import { DialogTitle, DialogActions } from 'material-ui/Dialog'
import Icon from 'material-ui/Icon'
import { Alert } from '@material-ui/lab'
import { MenuItem } from 'material-ui'

import { create } from '../../auth/api-auth'

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

const departments = [
    { 
        value: "physiology",
        label: "Physiology"
    },
    { 
        value: "radiology",
        label: "Pathology"
    },
    { 
        value: "admin",
        label: "Administration"
    }
]

class Signup extends Component{
    state = {
        username: '',
        firstname: '',
        middlename: '',
        surname: '',
        department: '',
        password: '',
        open: false,
        error: '',
        success: ''
    }
    

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    clickSubmit = () => {

        if (!this.state.username || !this.state.firstname || !this.state.surname || !this.state.department || !this.state.password){
            this.setState({error: "Please fill in all required fields"})
            return
        }

        const user = {
            username: this.state.username,
            firstname: this.state.firstname,
            middlename: this.state.middlename || undefined,
            surname: this.state.surname,
            department: this.state.department,
            password: this.state.password 
        }
        create(user).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else {
                this.setState({
                    success: 'Account created successfully',
                    username: '',
                    firstname: '',
                    middlename: '',
                    surname: '',
                    department: '',
                    password: '',
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

                        <TextField id="username" label="Username" variant="outlined"
                                    onChange={this.handleChange('username')} value={this.state.username}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="firstname" label="First Name" variant="outlined"
                                    onChange={this.handleChange('firstname')} value={this.state.firstname}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="middlename" label="Middle Name" variant="outlined"
                                    onChange={this.handleChange('middlename')} value={this.state.middlename}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="surname" label="Surname" variant="outlined"
                                    onChange={this.handleChange('surname')} value={this.state.surname}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="department" label="Department" variant="outlined"
                                    onChange={this.handleChange('department')}
                                    margin="normal" value={this.state.department} style={styles.textField} 
                                    select
                        >
                            {departments.map( option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> <br/>
                        <TextField id="password" type="password" label="Password" variant="outlined"
                                    onChange={this.handleChange('password')}
                                    margin="normal" value={this.state.password} style={styles.textField} /> <br/>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained"
                                onClick={this.clickSubmit} style={styles.submit} >
                            Register
                        </Button>
                    </CardActions>
                </Card>

                {/* <Dialog open={this.state.open}> 
                    <DialogTitle>
                        New Account Successfully Created
                    </DialogTitle>
                    <DialogActions style={{alignContent: 'center'}}>
                        <Button color="primary" style={{alignSelf: 'center'}}
                            onClick={() => this.setState({open: false})}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        )
    }
}


export default Signup