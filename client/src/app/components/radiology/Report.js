import React, { Component } from 'react'
import { Typography, Checkbox, Button, TextField } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { assessImage } from '../../helpers/api-radiology'

const styles = {
    image: {
        minHeight: 100,
        width: '100%',
        padding: 5
    },
    commentField: {
        width: "50%",
        marginLeft: 10,   
    }
}

class Report extends Component{
    state = {
        patient: this.props.patient,
        image: this.props.report.image,
        prediction: this.props.report.prediction,
        heatmap: null,
        comments: this.props.report.comments,
        disagree: this.props.report.disagree,
        error: '',
    }

    componentDidMount(){
        var image = {image: this.props.report.image}
        assessImage(image).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({heatmap: data.heatmap})
            }
        })
    }

    render() {
        return(
            <div>
                <div>
                    <Button color="primary" onClick={this.props.close}>
                        <ArrowBackIcon/>
                        &nbsp;Back
                    </Button>
                    <span style={{float: "right"}}>{this.props.report.created}</span>
                </div>
                <div style={{display: "flex"}}>
                   <div>
                       <img src={this.state.image} alt="Patients MRI" style={styles.image} />      
                   </div>
                   <div>
                       <img src={this.state.heatmap} alt="Heatmap of MRI" style={styles.image} />
                   </div>
               </div>
                
                <div style={{display: "flex"}}>
                    <Typography>
                        Cervical Cancer Prediction Value: {this.state.prediction}%
                    </Typography>
                    <Typography style={{marginLeft: 15}}>Disagree ?</Typography>
                    <Checkbox checked={this.state.disagree} disabled value="disagree" />
                 
                </div>

                <TextField multiline disabled value={this.state.comments}
                    rowsMax="10" variant="outlined" label="Comments" 
                    margin="normal" style={styles.commentField} />

            </div>
        )
    }
}

export default Report