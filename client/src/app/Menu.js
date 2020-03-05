import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Button from 'material-ui/Button'
import auth from './auth/auth-helper'

//highlights link that matches current location path
const isActive = (history, path) => {
    if(history.location.pathname === path)
        return {color: '#ff4081'}
    else
        return {color: '#ffffff'}
}

const Menu = withRouter(({history}) => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Typography type="title" color="inherit">
                    CAD4CC
                </Typography>
                <Link to="/">
                    <IconButton aria-label="Home" style={isActive(history, "/")}>
                        <HomeIcon/>
                    </IconButton>
                </Link>

                <div style={{float: "right"}} >
                {!auth.isAuthenticated() && (
                    <span>
                        <Link to="/signin">
                            <Button style={isActive(history, "/signin")}>
                                Sign In
                            </Button>
                        </Link>
                    </span>
                )}

                {auth.isAuthenticated() && (
                    <span style={{float: "right"}}>
                        <Button color="inherit" 
                            onClick={() => { auth.signout(() => history.push('/'))}}>
                                Sign Out
                        </Button>
                    </span>
                )}
                </div>
            </Toolbar>
        </AppBar>
    </div>
))

export default Menu