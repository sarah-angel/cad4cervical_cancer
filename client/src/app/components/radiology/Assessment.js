import React, { Component } from 'react'
import { Button, Typography, TextField, Checkbox, FormControlLabel, Modal, Card } from '@material-ui/core'
import { CardContent, CardMedia } from '@material-ui/core'
import { findDOMNode } from 'react-dom'
import { Alert } from '@material-ui/lab'

import PatientDetails from '../patient/PatientDetails'
import auth from '../../auth/auth-helper'
import uploadImg from '../../../assets/images/upload-big-arrow.png'
import { assessImage, saveReport } from '../../helpers/api-radiology'

const styles = {
    root: {
        maxWidth: 800,
        margin: '0 auto',
        padding: 20,
        minWidth: 300,
        justifyContent: 'center',
    },
    uploadCard: {
        maxWidth: 800,
        margin: 'auto',
        marginTop: '20%',
        textAlign: "center",
        borderStyle: 'none'
    },
    uploadMedia: {
        minHeight: 100,
        width: 100,
        margin: '0 auto'
    },
    image: {
        minHeight: 100,
        //height: '60%',
        //width: '60%',       
        maxHeight: 500,
        width: '100%',
        padding: 5
    },
    commentField: {
        marginLeft: 5,  
        marginRight: 5,      
    },
    controlBtns: {
        display: 'flex',
        flexDirection: 'row-reverse',
        position: 'sticky',
        bottom: 20,
        width: '100%',
        height: '100%',
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
        justifyContent: "center",
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
}
class Assessment extends Component{
    state = {
        patient: this.props.patient,
        image: null,
        diagnosis: null,
        heatmap: null,
        notes: '',
        disagree: false,
        showOriginal: true,
        readOnly: false,
        openModal: false,
        error: '',
    }
    

    getAssessment = (image) => {
        assessImage(image).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({heatmap: data.heatmap})
                this.setState({diagnosis: data.diagnosis})
            }
        })
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
            this.getAssessment(reader.result)
        }
        reader.readAsDataURL(file)
    }

    handleChange = name => event => {
        if (!this.state.readOnly)
            if ( name == "disagree"){
                this.setState({disagree: event.target.checked})
                this.setState(prevState => ({diagnosis: {diagnosis: !prevState.diagnosis.diagnosis, confidence: null}}))
            }
            else
                this.setState({[name]: event.target.value})
    }

    save = (event) => {
        var report = {
            patient_ID: this.state.patient._id,
            staff_ID: auth.isAuthenticated().user._id,
            image: this.state.image,
            diagnosis: this.state.diagnosis,
            notes: this.state.notes
        }
        saveReport(report).then((data) => {
            if( data.error )
                this.setState({error: data.error})
            else{
                //To-Do: show success message
                //reset state and go to home
                window.location.href="/"
            }
        })
    }

    //To-Do: Ask user for confirmation 
    //reset state and go to home
    discard = (event) => {
        window.location.href="/"
    }

    render() {
        if ( !this.state.image)
            return(
                <div style={styles.uploadCard} onClick={this.openUploadDialog}>
                    {this.state.error && 
                        <Alert severity="error" style={{width: "70%", margin: "auto"}}
                            onClose={() => this.setState({error: null})}
                        >
                            {this.state.error}
                        </Alert>
                    }
                    
                    <input ref="imageUpload" type="file" accept="image/*"
                        onChange={this.handleUpload} 
                        style={{display: 'none'}} 
                    />
                    <CardMedia component="img" image={uploadImg} style={styles.uploadMedia} />
                    <CardContent>
                        <Typography>
                            Upload Pap Smear Image
                        </Typography>
                    </CardContent>
                </div>
            )

        return (
            <div style={styles.root}>
                {this.state.error && 
                    <Alert severity="error" style={{width: "70%", margin: "auto"}}
                        onClose={() => this.setState({error: null})}
                    >
                        {this.state.error}
                    </Alert>
                }
                <img src={this.state.image} alt="Patients Pap Smear image" style={styles.image} />   
      
                {/* this.state.showOriginal 
                    ?<div>
                       <img src={this.state.image} alt="Patients Pap Smear image" style={styles.image} />   
                       <Button color="primary"
                            onClick={() => this.setState({showOriginal: false})} >
                           View Texture Heatmap
                        </Button>   
                     </div>
                    :<div>
                        <img src={this.state.heatmap} alt="Heatmap of MRI" style={styles.image} />
                        <Button color="primary"
                            onClick={() => this.setState({showOriginal: true})}>
                            View Original
                        </Button>
                     </div>
                */}

                <br/>
                        
                {!this.state.diagnosis
                    ? <Typography>
                        Assessment not available
                        </Typography>
                    : <div> 
                        <div style={{display: 'flex'}}>
                            <span style={{width: '40%', minWidth: 200}}>
                                <Typography style={{color: 'grey', fontSize: 14}}>
                                    Cervical Cancer
                                </Typography>
                                <Typography>
                                    {this.state.diagnosis.diagnosis ? 'Positive' : 'Negative'}
                                </Typography>
                            </span>
                            <span style={{width: '40%', minWidth: 200}}>
                                <Typography style={{color: 'grey', fontSize: 14}}>
                                    Confidence
                                </Typography>
                                <Typography style={{}}>
                                    {this.state.diagnosis.confidence ? this.state.diagnosis.confidence + '%' : 'n/a'}
                                </Typography>
                            </span>
                        </div>                      
                        
                        <br/>
                        <FormControlLabel label="Change Diagnosis" labelPlacement="start"
                            control={<Checkbox checked={this.state.disagree}
                            onChange={this.handleChange("disagree")} />}
                            style={{marginLeft: 0}}
                        />
                        <Typography style={{color: 'grey', fontSize: 13}}>
                            Warning: Changing the diagnosis is irreversible
                        </Typography>
                    </div>
                }

                <br/>
                <TextField id="notes" label="Clinical Notes" variant="outlined"
                  onChange={this.handleChange('notes')} rows={4} rowsMax={20}
                  multiline margin="normal" fullWidth value={this.state.notes} />

                { !this.state.readOnly && (
                    <div style={styles.controlBtns}>
                        <Button color="primary" variant="outlined"
                            style={{marginLeft: 10}}
                            onClick={() => this.setState({openModal: true})}
                        >
                            Discard
                        </Button>
                        <Button color="primary" variant="contained"
                            style={{marginLeft: 10, width: 100}}
                            onClick={this.save}
                        >
                            Save
                        </Button>
                    </div>
                )}

            <Modal open={this.state.openModal} style={styles.modal} >
                <Card style={styles.confirmCard} >
                    <Typography style={{marginTop: 10, textAlign: "center"}} >
                        Are you sure you want to discard this test?
                    </Typography>
                    <div style={styles.btnGroup} >
                        <Button 
                            //style={{color: "white", backgroundColor: "red", marginLeft: 10}}
                            onClick={() => this.setState({openModal: false})}
                        >
                            Cancel
                        </Button>
                        <Button style={{marginLeft: 10, float: "right"}}
                            onClick={() =>  window.location.href="/"}//this.setState({openModal: false})}
                        > 
                            Discard
                        </Button>
                    </div>
                </Card>
            </Modal>
                
            </div>

            
        )
    }
}

export default Assessment