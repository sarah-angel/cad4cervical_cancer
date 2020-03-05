import React, { Component } from 'react'
import { Card, Typography } from 'material-ui'
import { CardContent, CardMedia } from 'material-ui/Card'
import uploadImg from '../../../assets/images/upload-big-arrow.png'
import SearchPatient from '../search/SearchPatient'
import PatientDetails from '../patient/PatientDetails'
import { findDOMNode } from 'react-dom'
import Assessment from './Assessment'

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
            image: null
        }
    }

    getPatient = (patient) => {
        this.setState({ patient: patient })
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

    render() {
        if ( !this.state.patient )
            return (
                <div>
                    <SearchPatient getPatient={this.getPatient} />
                </div>
            )

        if ( this.state.image )
                  return (
                      <Assessment image={this.state.image} patient={this.state.patient} />
                  )

        return (
            <div>
                <PatientDetails patient={this.state.patient} />
                {
                    //find upload icon large like for dropbox
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