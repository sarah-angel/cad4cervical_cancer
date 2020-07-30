import React, { Component } from 'react'
import { Tabs, Tab, IconButton, Hidden, Drawer, Toolbar, Divider } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import Consultation from './Consultation'
import History from './History'
import ConsultationReport from './ConstultationReport'
import { getHistory } from '../../helpers/api-consultation'

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
        width: 300,
    }
})
class PhysiologyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: null,
            history: null,
            viewReportIndex: null,
            viewReport: null,
            tab: 0, //current tab (Consultation)
        }
    }

    getPatient = (patient) => {
        this.setState({ patient: patient })

        getHistory(patient._id).then((data) => {
            if (data.error)
                this.setState({error: data.error})
            else{
                this.setState({history: data})
            }
        })
    }

    setViewReportIndex = (index) => {
        //this.setState({viewReportIndex: index})
        
        if (index != null)
            this.setState({viewReport: this.state.history[index]})
        else
            this.setState({viewReport: null})
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }

    render() {
        if ( !this.state.patient )
            return (
                <div>
                    <SearchPatient getPatient={this.getPatient} />
                </div>
            )
        
        return (
            <div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
    
                    <Hidden smUp implementation="css">
                            <Drawer variant="temporary"
                                open={this.props.mobileOpen}
                                onClose={this.props.handleDrawerToggle}
                                //ModalProps={{keepMounted: true}}
                                //classes={{ paper: this.props.classes.drawerPaper}}
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

                                
                           
                                <div style={{marginTop: 0, flex: 1}} > 
                                    <PatientDetails patient={this.state.patient} />

                                    <Divider />

                                    {this.state.history && 
                                        <History history={this.state.history} 
                                            setViewReportIndex={this.setViewReportIndex} 
                                        />
                                    }
                                </div>
                        </Drawer>
                    </Hidden>

                    <Hidden smDown implementation="css">
                        {/* <Drawer
                          className={this.props.classes.drawer}
                          variant="permanent"
                        > */}
                            <Toolbar />
                            <div style={{marginTop: 0, flex: 1, borderRightWidth: 1, borderRightColor: "grey", overflowX: "visible"}} > 
                                <PatientDetails patient={this.state.patient} />
                                
                                <Divider />

                                {this.state.history && 
                                    <History history={this.state.history} 
                                        setViewReportIndex={this.setViewReportIndex} 
                                    />
                                }
                            </div>
                        {/* </Drawer> */}
                    </Hidden>

                    <div style={{flex: 1, justifyContent: 'center'}} > 
                        <Toolbar />
                        
                        {this.state.viewReport
                            ? (
                                <ConsultationReport report={this.state.viewReport} 
                                    setViewReportIndex={this.setViewReportIndex}
                                />
                            ):(
                                <Consultation patient={this.state.patient} />
                            )
                        }
                    </div>
                </div>  
            </div>
        )
    }
}

export default withStyles(styles)(PhysiologyHome)