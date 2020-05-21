import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
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
    <div style={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar >
                <Button type="title" 
                    color="inherit"
                    onClick={() => history.go('/')}
                >
                    CAD4CC
                </Button>

                {/* <Link to="/" style={{flexGrow: 1}}>
                    <IconButton aria-label="Home" style={isActive(history, "/")}>
                        <HomeIcon/>
                    </IconButton>
                </Link> */}

                <div style={{flexGrow: 1}}>
                {/* {!auth.isAuthenticated() && (
                    <span>
                        <Link to="/signin">
                            <Button style={isActive(history, "/signin")}>
                                Sign In
                            </Button>
                        </Link>
                    </span>
                )} */}
                </div>
                
                {auth.isAuthenticated() && (
                    <Button color="inherit" 
                        onClick={() => { auth.signout(() => history.push('/'))}}>
                            Sign Out
                    </Button>
                )}
                
            </Toolbar>
        </AppBar>
    </div>
))

export default Menu