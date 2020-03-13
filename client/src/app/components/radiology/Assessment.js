import React, { Component } from 'react'
import PatientDetails from '../patient/PatientDetails'
import { assessImage, saveReport } from '../../helpers/api-radiology'
import auth from '../../auth/auth-helper'
import { Button, Typography, TextField, Checkbox } from '@material-ui/core'

const styles = {
    image: {
        minHeight: 100,
        width: '100%',
        padding: 5
    },
    commentField: {
        minWidth: '50%',
        maxWidth: 800,
        margin: 'auto'
        
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
            <div>
                
                <PatientDetails patient={this.state.patient} />
               
               <div style={{display: "flex", margin: 'auto'}}>
                   <div>
                       <img src={this.state.image} alt="Patients MRI" style={styles.image} />      
                   </div>
                   <div>
                       <img src={this.state.heatmap} alt="Heatmap of MRI" style={styles.image} />
                   </div>
               </div>
                
                <div style={{display: "flex", margin: 'auto'}}>
                    <Typography>
                        Cervical Cancer Prediction Value: {this.state.prediction}%
                    </Typography>
                    <Typography style={{marginLeft: 15}}>Disagree ?</Typography>
                    <Checkbox checked={this.state.disagree} onChange={this.handleDisagree} value="disagree" />
                 
                </div>

                <TextField multiline onChange={this.handleComment}
                    rows="4" variant="outlined" label="Comments" 
                    margin="normal" style={styles.commentField} />
            
                { (this.state.error) }
                
                <div style={styles.controlButtons}>
                    <Button onClick={this.handleSave} color="primary">Save</Button>
                    <Button onClick={this.handleDiscard} color="secondary">Discard</Button>
                </div>
                
            </div>

            
        )
    }
}

export default Assessment