import React, { Component } from 'react'
import { create } from '../../auth/api-auth'
import Typography from 'material-ui/Typography'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField, Dialog } from 'material-ui'
import { DialogTitle, DialogActions } from 'material-ui/Dialog'
import Icon from 'material-ui/Icon'
import { indigo } from 'material-ui/colors'

const styles = {
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 5
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: 5,
        color: indigo[400]
    },
    textField: {
        marginLeft: 2,
        marginRight: 2,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: 5
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
                        <Typography type="headline" component="h2" style={styles.title}>
                            Sign Up
                        </Typography>
                        <TextField id="username" label="Username" onChange={this.handleChange('username')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="firstname" label="First Name" onChange={this.handleChange('firstname')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="middlename" label="Middle Name" onChange={this.handleChange('middlename')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="surname" label="Surname" onChange={this.handleChange('surname')}
                                    margin="normal" style={styles.textField} /> <br/>
                        <TextField id="department" label="Department" onChange={this.handleChange('department')}
                                    margin="normal" value={this.state.email} style={styles.textField} /> <br/>
                        <TextField id="password" type="password" label="Password" onChange={this.handleChange('password')}
                                    margin="normal" value={this.state.password} style={styles.textField} /> <br/>
                        {this.state.error && (
                            <Typography component="p" color="error">
                                <Icon color="error" style={styles.error}></Icon>
                                {this.state.error}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" raised="raised" 
                                onClick={this.clickSubmit} style={styles.submit} >
                            Submit
                        </Button>
                    </CardActions>
                </Card>
                <Dialog open={this.state.open}> 
                    <DialogTitle>New Account Successfully Created</DialogTitle>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.setState({open: false})}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default Signup