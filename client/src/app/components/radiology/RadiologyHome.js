import React, { Component } from 'react'
import { Tabs, Tab, Typography } from 'material-ui'
import { CardContent, CardMedia } from 'material-ui/Card'
import uploadImg from '../../../assets/images/upload-big-arrow.png'
import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import { findDOMNode } from 'react-dom'
import Assessment from './Assessment'
import History from './History'

const styles = {
    uploadCard: {
        maxWidth: 300,
        margin: 'auto',
        marginTop: 50,
        textAlign: "center",
        borderStyle: 'none'
    },
    uploadMedia: {
        minHeight: 100,
        width: 100,
        margin: '0 auto'
    }
}

class RadiologyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: null,
            image: null,
            tab: 0, //current tab (Consultation)
        }
    }

    getPatient = (patient) => {
        this.setState({ patient: patient })
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }

    //Can't make a component an input field so have to redirect the click
    openUploadDialog = () => {
        var fileUploadDom = findDOMNode(this.refs.imageUpload)
        fileUploadDom.click()
    }

    //Convert uploaded image to base64 and sets it to the state
    handleUpload = (event) => {
        var file = event.target.files[0]
        var reader = new FileReader()
        reader.onloadend = () => {
            this.setState({image: reader.result})
        }
        reader.readAsDataURL(file)
    }

    //To-Do: Tabs duplicated 3 times!!? Refactor

    render() {
        if ( !this.state.patient )
            return (
                <div>
                    <SearchPatient getPatient={this.getPatient} />
                </div>
            )
        
        //Display history section when tab changes
        if ( this.state.tab === 1 )
                return (
                    <div>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Consultation" />
                        <Tab label="History" />
                    </Tabs>
                    <History patient={this.state.patient} />
                    </div>
                )

        if ( this.state.image && this.state.tab === 0 )
            return (
                <div>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Consultation" />
                        <Tab label="History" />
                    </Tabs>
                    <Assessment image={this.state.image} patient={this.state.patient} />
                </div>
            )

        return (
            <div>
                <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Consultation" />
                        <Tab label="History" />
                </Tabs>

                <PatientDetails patient={this.state.patient} />
                {
                    //show loading animation when waiting for response
                }
                
                <div style={styles.uploadCard} onClick={this.openUploadDialog}>
                    <input ref="imageUpload" type="file" onChange={this.handleUpload} style={{display: 'none'}} />
                    <CardMedia component="img" image={uploadImg} style={styles.uploadMedia} />
                    <CardContent>
                        <Typography>
                            Upload Patient MRI
                        </Typography>
                    </CardContent>
                </div>
            </div>
        )

      
    }
}

export default RadiologyHome