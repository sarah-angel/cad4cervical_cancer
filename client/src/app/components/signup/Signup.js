import React, { Component } from 'react'
import { create } from '../../auth/api-auth'
import Typography from 'material-ui/Typography'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField, Dialog } from 'material-ui'
import Icon from 'material-ui/Icon'

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
                <Card>
                    <CardContent>
                        <Typography type="headline" component="h2">
                            Sign Up
                        </Typography>
                        <TextField id="username" label="Username" onChange={this.handleChange('username')}
                                    margin="normal"/> <br/>
                        <TextField id="firstname" label="First Name" onChange={this.handleChange('firstname')}
                                    margin="normal"/> <br/>
                        <TextField id="middlename" label="Middle Name" onChange={this.handleChange('middlename')}
                                    margin="normal"/> <br/>
                        <TextField id="surname" label="Surname" onChange={this.handleChange('surname')}
                                    margin="normal"/> <br/>
                        <TextField id="department" label="Department" onChange={this.handleChange('department')}
                                    margin="normal" value={this.state.email}/> <br/>
                        <TextField id="password" type="password" label="Password" onChange={this.handleChange('password')}
                                    margin="normal" value={this.state.password}/> <br/>
                        {this.state.error && (
                            <Typography component="p" color="error">
                                <Icon color="error">
                                    error
                                </Icon>
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" raised="raised" onClick={this.clickSubmit}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
                <Dialog open={this.state.open}> ... </Dialog>
            </div>
        )
    }
}


export default Signup