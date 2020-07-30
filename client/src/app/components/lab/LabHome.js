import React, { Component } from 'react'
import { Typography, Button, IconButton, Hidden, Drawer, Toolbar, Modal, Card } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import LabTest from './LabTest'
import { getConsultationPendingLab } from '../../helpers/api-lab'

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
    },
    modal: {
        outline: 0,
        '&:focus': {
            outline: "none",
            borderWidth: "0px",
            backgroundColor: "white",
        },
        overflow: "scroll",
    },
    btnGroup: {
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        //float: "right",
        justifyContent: "right",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20, 
        marginRight: 20,
    },
    confirmCard: {
        top: "50%", 
        left: "50%", 
        transform: 'translate(-50%, -50%)', 
        width: "20%", 
        minWidth: 200,
        position: "absolute", 
        border: '0px solid #000', 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
    },
})

class LabHome extends Component {
    state = {
        patient: null,
        tab: 0,
        openModal: false
    }

    getPatient = (patient) => {
        //check if consultation done before
        //only allow if consultaion exists

        //returns consultation or {}
        getConsultationPendingLab({
            patient_ID: patient._id
        }).then((data) => {
            if(data.error) {
                this.setState({error: data.error})
                return
            }
            if (!data._id){
                //no consultation; throw error
                console.log("no consultation")
                this.setState({openModal: true})
                return
            } else {}

        })
        this.setState({ patient: patient })
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
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <nav style={{marginTop: 0}}>
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

                                <div style={{marginTop: 0}}>
                                    <PatientDetails patient={this.state.patient} />
                                </div>
                            </Drawer>
                        </Hidden>
        
                        <Hidden smDown implementation="css">
                            {/* <Drawer
                              className={this.props.classes.drawer}
                              variant="permanent"
                            > */}
                                {/* <Toolbar /> */}
                                <PatientDetails patient={this.state.patient} />
                            {/* </Drawer> */}
                        </Hidden>
                    </nav>
                    
                    {/* <div style={{flex: 1, maxWidth: 300}} > 
                        <PatientDetails patient={this.state.patient} />
                    </div> */}
                    <div style={{flex: 1, justifyContent: 'center'}} > 
                        <Toolbar />
                        <LabTest patient={this.state.patient} />
                    </div>

                    <Modal open={this.state.openModal} className={this.props.classes.modal} >
                    <Card className={this.props.classes.confirmCard} >
                        <Typography style={{marginTop: 10}} >
                            No consultation available for this patient.
                        </Typography>
                        <div style={{justifyContent: "right"}} >
                            <Button style={{marginLeft: 10, float: "right"}}
                                onClick={() =>  window.location.href="/"}//this.setState({openModal: false})}
                            > 
                                OK
                            </Button>
                        </div>
                    </Card>
                    </Modal>
                </div>     
            )
    }
}

export default withStyles(styles)(LabHome)