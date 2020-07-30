import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField, Typography, Toolbar } from '@material-ui/core'
import Icon from 'material-ui/Icon'
import { Alert } from '@material-ui/lab'

import { signin } from '../../auth/api-auth'
import auth from '../../auth/auth-helper'

const styles = {
    card: {
        maxWidth: 400,
        margin: 'auto',
        textAlign: 'center',
        marginTop: 100,
        padding: 20,
        borderRadius: 5,
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
    },
    textField: {
        width: '100%'
    },
    submit: {
        margin: 'auto',
        marginLeft: 10,
        marginRight: 10,
        width: '100%',
    }
}

class Signin extends Component {
    state = {
        username: '',
        password: '', 
        error: '',
        redirectToReferrer: false
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    clickSubmit = () => {
        const user = {
            username: this.state.username || undefined, 
            password: this.state.password || undefined
        }

        signin(user).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                auth.authenticate( data, () => {
                    this.setState({redirectToReferrer: true})
                } )
            }
        })
    }

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: '/' }
        }
        const { redirectToReferrer } = this.state
        
        if (redirectToReferrer)
            return ( <Redirect to={from} />)
    
        return (
            <div>
                <Toolbar />
                
                {this.state.error && 
                    <Alert severity="error" style={{width: "60%", margin: "auto", marginTop: 20}}
                        onClose={() => this.setState({error: null})}
                    >
                        {this.state.error}
                    </Alert>
                }
            
                <Card style={styles.card}>
                    <CardContent>
                        {/* <Typography type="headline" component="h2" 
                            color="primary" style={styles.title}
                        >
                            Sign In
                        </Typography> */}
                        <TextField id="username" type="username" variant="outlined"
                                    style={styles.textField}
                                    label="Username" onChange={this.handleChange('username')}
                                    margin="normal" value={this.state.username}/> <br/>
                        <TextField id="password" type="password" variant="outlined"
                                    style={styles.textField}
                                    label="Password" onChange={this.handleChange('password')}
                                    margin="normal" value={this.state.password}/> <br/>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" 
                                variant="contained"
                                onClick={this.clickSubmit} style={styles.submit}>
                            Sign In
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    
    }
}

export default Signin