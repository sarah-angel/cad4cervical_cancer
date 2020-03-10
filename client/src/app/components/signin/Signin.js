import React, { Component } from 'react'
import { signin } from '../../auth/api-auth'
import auth from '../../auth/auth-helper'
import { Redirect } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import { Button, TextField } from 'material-ui'
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
                <Card style={styles.card}>
                    <CardContent>
                        <Typography type="headline" component="h2" style={styles.title}>
                            Sign In
                        </Typography>
                        <TextField id="username" type="username" label="Username" onChange={this.handleChange('username')}
                                    margin="normal" value={this.state.email}/> <br/>
                        <TextField id="password" type="password" label="Password" onChange={this.handleChange('password')}
                                    margin="normal" value={this.state.password}/> <br/>
                        {this.state.error && (
                            <Typography component="p" color="error">
                                <Icon color="error" style={styles.error}></Icon>
                                {this.state.error}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" raised="raised" 
                                onClick={this.clickSubmit} style={styles.submit}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    
    }
}

export default Signin