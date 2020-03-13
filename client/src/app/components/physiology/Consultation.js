import React, { Component } from 'react'
import { TextField, Typography, InputAdornment, MenuItem, Button } from 'material-ui'
import  AddBoxIcon  from '@material-ui/icons/AddBox'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import { getPending, getPrediction, save } from '../../helpers/api-consultation'
import { getByConsultationID } from '../../helpers/api-lab'
import auth from '../../auth/auth-helper'
import LabTest from '../lab/LabTest'

/**Consultation Schema
 * patient_ID
 * staff_ID
 * symptoms []
 * weight (kg)
 * height (cm)
 * temperature (C)
 * smokes (yes/no)
 * alcohol (yes/no)
 * region
 * children
 * family_history
 * prediction
 * comments
 */

const styles = {
    textField: {
        marginLeft: 5,
        marginRight: 30,
        maxWidth: 200,
    },
    form: {
        maxWidth: 800,
        margin: '0 auto'
    },
    selectField: {
        marginLeft: 5,
        marginRight: 5,
        width: 100,
    },
    symptomsField: {
        marginLeft: 5,
        width: 350
    },
    controlBtns: {
        alignContent: 'center'
    }
}

const select = [
    {
        value: 'true',
        label: 'YES',
    },
    {
        value: 'false',
        label: 'NO',
    },
    {
        value: '',
        label: 'NONE'
    }
]

class Consultation extends Component {
    
    state = {
        patient_ID: this.props.patient._id,
        staff_ID: null,
        symptoms: [],
        weight: '',
        height: '',
        temperature: '',
        smokes: '',
        alcohol: '',
        region: '',
        children: '',
        family_history: '',
        prediction: '',
        comments: '',
        addSymptom: [],
        lab: false,
        open_lab: true,
        error: '',
    }

    //Fetch the last incomplete consultation for the patient
    //if it doesn't exist start a new consultation
    //if exists check if corresponding lab test is available
    componentDidMount = async () => {
        var patient = {
            patient_ID: this.state.patient_ID
        }
        await getPending(patient).then( (data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({
                    consultation_ID: data._id,
                    symptoms: data.symptoms,
                    weight: !data.weight ? '' : data.weight ,
                    height: !data.height ? '' : data.height,
                    temperature: !data.temperature ? '' : data.temperature,
                    smokes: (data.smokes === null || data.smokes === undefined) ? '' : `${data.smokes}`,
                    alcohol: (data.alcohol === null || data.alcohol === undefined) ? '' : `${data.alcohol}`,
                    region: !data.region ? '' : data.region,
                    children: !data.children ? '' : data.children,
                    family_history: !data.family_history ? '' : data.family_history,
                    prediction: !data.prediction ? '' : data.prediction,
                    comments: !data.comments ? '' : data.comments,
                })
            }
        })

        if (this.state.consultation_ID)
            getByConsultationID(this.state.consultation_ID).then((data) => {
                if( !data ) return

                if(data.error)
                    this.setState({error: data.error})
                else{
                    this.setState({lab: true, lab_test: data})
                }
        })

    }

    //Only triggered if lab test is available
    getPrediction = () => {
        var info = {
            info: 'bla'
        }
        getPrediction(info).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({prediction: data.prediction})
            }
        })
    }

    addSymptomField = event => {      
        this.setState( prev => ({ addSymptom: [...prev.addSymptom, 'x'] }))
    }

    removeSymptomField = name => event => {
        this.setState({[name]: ''})
    }

    save = () => {
        var info = {
            consultation_ID: this.state.consultation_ID,
            patient_ID: this.state.patient_ID,
            staff_ID: auth.isAuthenticated().user._id,
            symptoms: this.state.symptoms,
            weight: this.state.weight,
            height: this.state.height,
            temperature: this.state.temperature,
            smokes: (this.state.smokes === '') ? null : this.state.smokes,
            alcohol: (this.state.alcohol === '') ? null : this.state.alcohol,
            region: this.state.region,
            children: this.state.children,
            family_history: this.state.family_history,
            prediction: this.state.prediction,
            comments: this.state.comments,
        }
        save(info).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                //To-Do: show success message
                window.location.href="/"
            }
        })
    }

    discard = () => {
        window.location.href = '/'
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }
    
    render() {

        return(<div style={styles.form}>
            <TextField id="weight" label="Weight" onChange={this.handleChange('weight')}
                    margin="normal" style={styles.textField} value={this.state.weight}
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="height" label="Height" onChange={this.handleChange('height')}
                    margin="normal" style={styles.textField} value={this.state.height}
                    InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}/>
            <TextField id="temperature" label="Temperature" onChange={this.handleChange('temperature')}
                    margin="normal" style={styles.textField} value={this.state.temperature}
                    InputProps={{endAdornment: <InputAdornment position="end">°C</InputAdornment>}}/>
            <TextField id="children" label="Children" onChange={this.handleChange('children')}
                    margin="normal" style={styles.textField} value={this.state.children} />
            <TextField id="family_history" label="Family History" onChange={this.handleChange('family_history')}
                    margin="normal" style={styles.textField} value={this.state.family_history} />
            <TextField id="smokes" label="Smokes" onChange={this.handleChange('smokes')}
                    margin="normal" style={styles.textField, styles.selectField}
                    select value={this.state.smokes}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            <TextField id="alcohol" label="Alcohol" onChange={this.handleChange('alcohol')}
                    margin="normal" style={styles.textField, styles.selectField}
                    select value={this.state.alcohol}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            
            <br/>
            <TextField id="symptoms" label="Symptoms" onChange={this.handleChange('symptoms0')}
                    margin="normal" style={styles.symptomsField} />
            <Button onClick={this.addSymptomField}><AddBoxIcon/></Button>
            <br/>
            {this.state.addSymptom.map((val, index) => {
                return (<span key={index}>
                    <TextField id="symptoms" label="Symptoms" onChange={this.handleChange(`symptoms${index + 1}`)}
                        margin="normal" style={styles.symptomsField} />
                    <Button onClick={this.removeSymptomField(`symptoms${index + 1}`)}><InputAdornment/></Button>
                    <br/></span>
                )
            })}

            { this.state.lab_test && this.state.lab && this.state.open_lab 
                ? <LabTest labTest={this.state.lab_test}/>
                :<Typography>Lab Results: Unavailable</Typography>
            }
            
            <br/>
            <TextField id="prediction" label="Prediction" disabled
                    margin="normal" style={styles.textField} value={this.state.prediction}
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            <Button  onClick={this.getPrediction} color="primary" disabled={!this.state.lab}>
                Get Risk Assessment
            </Button>
            <br/>
            <TextField id="comments" label="Comments" onChange={this.handleChange('comments')}
                    multiline margin="normal" fullWidth value={this.state.comments} />

            <div style={styles.controlBtns}>
                <Button onClick={this.save} color="primary">Save</Button>
                <Button onClick={this.discard} color="primary">Discard</Button>
            </div>
            
            {this.state.error && (
                <Typography color="error">
                    {this.state.error}
                </Typography>
            )}

        </div>)
    }
}

export default Consultation