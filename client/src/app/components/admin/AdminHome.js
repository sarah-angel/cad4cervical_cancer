import React, { Component } from 'react'
import { Tabs, Tab, IconButton, Hidden, Drawer, Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

import Signup from '../signup/Signup'
import PatientRegistration from '../signup/PatientRegistration'

const styles = theme => ({
    toolbar: {
        backgroundColor: theme.palette.primary.main
    },
    drawer: {
        //width: 300,
        flexGrow: 1,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 250,
    }
})

class AdminHome extends Component {
    state = {
        patient: null,
        tab: 0

    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }

    render() {
   
            return (
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <nav className={this.props.classes.toolbar} style={{marginTop: 0}}>
                        <Hidden smUp implementation="css">
                            <Drawer variant="temporary"
                                open={this.props.mobileOpen}
                                onClose={this.props.handleDrawerToggle}
                                //ModalProps={{keepMounted: true}}
                                classes={{ paper: this.props.classes.drawerPaper}}
                                style={{}}
                            >
                                <Toolbar className={this.props.classes.toolbar}>
                                    <IconButton
                                        onClick={this.props.handleDrawerToggle}
                                        style={{marginLeft: '90%'}}
                                    >
                                        <CloseIcon style={{color: "white"}} />
                                    </IconButton>
                                </Toolbar>

                            </Drawer>
                        </Hidden>
        
                        <Hidden smDown implementation="css">
                            {/* <Drawer
                              className={this.props.classes.drawer}
                              variant="permanent"
                            >
                                <Toolbar />
                            </Drawer> */}
                        </Hidden>
                    </nav>
                    
              
                    <div style={{flex: 1, justifyContent: 'center', marginBottom: 15, marginTop: 15}} > 
                            <Toolbar />

                            {this.state.error && 
                                <Alert severity="error" style={{width: "60%", margin: "auto", marginTop: 20}}
                                    onClose={() => this.setState({error: null})}
                                >
                                    {this.state.error}
                                </Alert>
                            }

                            <Tabs
                                value={this.state.tab}
                                onChange={this.handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered 
                                //variant="scrollable"
                            >              
                                <Tab label="Staff" />
                                <Tab label="Patient" />
                            </Tabs>

                            { this.state.tab === 0 &&
                                <Signup />
                            }
                            { this.state.tab === 1 &&
                                <PatientRegistration />
                            }
                    </div>
                </div>     
            )
    }
}

export default withStyles(styles)(AdminHome)