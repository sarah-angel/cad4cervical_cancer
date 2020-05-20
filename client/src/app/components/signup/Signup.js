import React, { Component } from 'react'
import { create } from '../../auth/api-auth'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField, Dialog, Typography } from '@material-ui/core'
import { DialogTitle, DialogActions } from 'material-ui/Dialog'
import Icon from 'material-ui/Icon'

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
    },
    submit: {
        margin: 'auto',
        marginLeft: 10,
        marginRight: 10,
        width: '100%',
    }
}

class Signup extends Component{
    state = {
        username: '',
        firstname: '',
        middlename: '',
        surname: '',
        department: '',
        password: '',
        open: false,
        error: ''
    }
    

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    clickSubmit = () => {
        const user = {
            username: this.state.username || undefined,
            firstname: this.state.firstname || undefined,
            middlename: this.state.middlename || undefined,
            surname: this.state.surname || undefined,
            department: this.state.department || undefined,
            password: this.state.password || undefined 
        }
        create(user).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else
                this.setState({error: '', open: true})
        })
    }

    render() {
        return (
            <div>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography color="primary" component="h2" style={styles.title}>
                            Create Account
                        </Typography>

                        <TextField id="username" label="Username" variant="outlined"
                                    onChange={this.handleChange('username')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="firstname" label="First Name" variant="outlined"
                                    onChange={this.handleChange('firstname')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="middlename" label="Middle Name" variant="outlined"
                                    onChange={this.handleChange('middlename')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="surname" label="Surname" variant="outlined"
                                    onChange={this.handleChange('surname')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="department" label="Department" variant="outlined"
                                    onChange={this.handleChange('department')}
                                    margin="normal" value={this.state.email} style={styles.textField} /> <br/>
                        <TextField id="password" type="password" label="Password" variant="outlined"
                                    onChange={this.handleChange('password')}
                                    margin="normal" value={this.state.password} style={styles.textField} /> <br/>
                        {this.state.error && (
                            <Typography component="p" color="error">
                                <Icon color="error" style={styles.error}></Icon>
                                {this.state.error}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained"
                                onClick={this.clickSubmit} style={styles.submit} >
                            Sign Up
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


export default Signup