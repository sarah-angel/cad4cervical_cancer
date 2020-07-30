import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import auth from './auth/auth-helper'

//highlights link that matches current location path
const isActive = (history, path) => {
    if(history.location.pathname === path)
        return {color: '#ff4081'}
    else
        return {color: '#ffffff'}
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        // [theme.breakpoints.up('md')]: {
        //    // width: '100%'
        // },
        zIndex: 100000000
        //zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    }
}))

const Menu = withRouter(({history, handleDrawerToggle}) => {
    const classes = useStyles()
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = React.useState(false)
    
    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen)
    // }
    return (
    <div style={{}}>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar >
                <IconButton color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon color="inherit" />
                </IconButton>
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
)})

export default Menu