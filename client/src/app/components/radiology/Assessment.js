import React, { Component } from 'react'
import PatientDetails from '../patient/PatientDetails'
import { assessImage, saveReport } from '../../helpers/api-radiology'
import auth from '../../auth/auth-helper'
import { Button, Typography, TextField, Checkbox, FormControlLabel } from '@material-ui/core'

const styles = {
    root: {
        maxWidth: 800,
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        align: 'center',
    },
    image: {
        minHeight: 100,
        width: '100%',
        padding: 5
    },
    commentField: {
        marginLeft: 5,  
        marginRight: 5,      
    },
    controlButtons: {
        margin: 'auto'
    }
}
class Assessment extends Component{
    state = {
        patient: this.props.patient,
        image: this.props.image,
        prediction: null,
        heatmap: null,
        comments: '',
        disagree: false,
        showOriginal: true,
        error: '',
    }

    componentDidMount = () => {
        var image = {image: this.props.image}
        assessImage(image).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({heatmap: data.heatmap})
                this.setState({prediction: data.prediction})
            }

        })
    }

    handleDisagree = (event) => {
        this.setState({disagree: event.target.checked})
    }

    handleComment = (event) => {
        this.setState({comments : event.target.value})
    }

    handleSave = (event) => {
        var report = {
            patient_ID: this.state.patient._id,
            staff_ID: auth.isAuthenticated().user._id,
            image: this.state.image,
            prediction: this.state.prediction,
            comments: this.state.comments
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
    handleDiscard = (event) => {
        window.location.href="/"
    }

    render() {
        return (
            <div style={styles.root}>
                
                <PatientDetails patient={this.state.patient} />
               
                { this.state.showOriginal 
                    ?<div>
                       <img src={this.state.image} alt="Patients MRI" style={styles.image} />   
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
                }
                                   
                <Typography>
                    Predicted Risk : {this.state.prediction}%
                </Typography>
                
                <FormControlLabel label="Disagree?" labelPlacement="start"
                    control={<Checkbox checked={this.state.disagree} 
                                onChange={this.handleDisagree} value="disagre" />}
                />

                    
                 

                <TextField multiline onChange={this.handleComment}
                    label="Comments" fullWidth
                    margin="normal" style={styles.commentField} />
            
                <div style={styles.controlButtons}>
                    <Button onClick={this.handleSave} color="primary">Save</Button>
                    <Button onClick={this.handleDiscard} color="primary">Discard</Button>
                </div>

                { this.state.error && (
                    <Typography color="error">
                        {this.state.error}
                    </Typography>
                ) }
            </div>

            
        )
    }
}

export default Assessment