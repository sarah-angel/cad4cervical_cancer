import React, { Component } from 'react'
import { TextField, Typography,
     InputAdornment, MenuItem,
     Button, Checkbox, FormLabel, FormControl,
     FormControlLabel, FormGroup
} from '@material-ui/core'
import  AddBoxIcon  from '@material-ui/icons/AddBox'

import { getPending, getPrediction, save } from '../../helpers/api-consultation'
import { getByConsultationID } from '../../helpers/api-lab'
import auth from '../../auth/auth-helper'
import LabTest from '../lab/LabTest'
import symptoms from './symptoms'
import conditions from './conditions'

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
        display: 'flex',
        flexDirection: 'row-reverse',
        position: 'sticky',
        bottom: 20,
        width: '100%',
        height: '100%',
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

const durations = [
    {
        value: '',
        label: 'NONE'
    },
    {
        value: 'oneWeek',
        label: 'One Week',
    },
    {
        value: 'threeWeek',
        label: 'Three Weeks',
    },
    {
        value: 'oneMonth',
        label: 'One Month',
    },
    {
        value: 'twoMonths',
        label: 'Two Months',
    },
    {
        value: 'sixMonths',
        label: 'Six Months',
    },
    {
        value: 'oneYear',
        label: 'One Year',
    },
    {
        value: 'moreThanOneYear',
        label: 'More Than One Year',
    },
]

class Consultation extends Component {

    state = {
        patient_ID: this.props.patient._id,
        staff_ID: null,
        //symptoms: [],
        weight: '',
        height: '',
        temperature: '',
        smokes: '',
        alcohol: '',
        region: '',
        children: '',
        family_history: '',
        symptom_duration: '',
        existing_conditions: null,
        prediction: '',
        notes: '',
        disagree: false,
        lab: false,
        open_lab: true,
        readOnly: false,
        error: '',
        symptoms: symptoms,
    }

    /**
     * If report is given in props then set to readOnly
     * else
     * Fetch the last incomplete consultation for the patient
     * if it doesn't exist start a new consultation
     * if exists check if corresponding lab test is available
     */

    componentDidMount = async () => {
        var patient = {
            patient_ID: this.state.patient_ID
        }

        var data = {}

        if (this.props.report){
            data = this.props.report
            this.setState({
                readOnly: true,
            })
        }else
        await getPending(patient).then( (res) => {
            if(res.error)
                this.setState({error: res.error})
            else{
                data = res
            }
        })

        await this.setState({
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
            symptom_duration: !data.symptom_duration ? '' : data.symptom_duration,
            prediction: !data.prediction ? '' : data.prediction,
            notes: !data.notes ? '' : data.notes,
            symptoms: symptoms,
            existing_conditions: conditions,
        })

        //Get lab results
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
            info: 'bla',
            symptoms: this.state.symptoms
        }
        getPrediction(info).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({prediction: data.prediction})
            }
        })
    }

    save = () => {
        let existing_conditions = []
        //convert existing_conditions to array
        Object.entries(this.state.existing_conditions)
            .map( ([condition, checked], index) => {
                if (checked)
                    existing_conditions.push(condition)
            })

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
            family_history: (this.state.family_history === '') ? null : this.state.family_history,
            symptom_duration: (this.state.symptom_duration === '') ? null : this.symptom_duration,
            existing_conditions: existing_conditions,
            prediction: this.state.prediction,
            notes: this.state.notes,
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
        if (!this.state.readOnly)
            if ( name == "disagree")
                this.setState({disagree: event.target.checked})
            else
                this.setState({[name]: event.target.value})
    }

    handleSymptoms = event => {
        symptoms[event.target.name] = event.target.checked
        this.setState({symptoms: symptoms})
    }

    handleConditions = event => {
        //uncheck none if any other condition is checked
        if (event.target.name != "none")
            conditions.none = false
        conditions[event.target.name] = event.target.checked
        this.setState({existing_conditions: conditions})
    }

    render() {
        return(<div style={styles.form}>
            <TextField id="weight" label="Weight" variant="outlined"
                    onChange={this.handleChange('weight')}
                    margin="normal" style={styles.textField} value={this.state.weight}
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="height" label="Height" variant="outlined"
                    onChange={this.handleChange('height')}
                    margin="normal" style={styles.textField} value={this.state.height}
                    InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}/>
            <TextField id="temperature" label="Temperature" variant="outlined"
                    onChange={this.handleChange('temperature')}
                    margin="normal" style={styles.textField} value={this.state.temperature}
                    InputProps={{endAdornment: <InputAdornment position="end">°C</InputAdornment>}}/>
            <TextField id="children" label="Children" variant="outlined"
                    onChange={this.handleChange('children')}
                    margin="normal" style={styles.textField} value={this.state.children} />
            <TextField id="family_history" label="Family History" variant="outlined"
                    onChange={this.handleChange('family_history')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.family_history}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="smokes" label="Smokes" variant="outlined"
                    onChange={this.handleChange('smokes')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.smokes}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="alcohol" label="Alcohol" variant="outlined"
                    onChange={this.handleChange('alcohol')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.alcohol}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField id="symptom_duration" label="Symptom Duration" variant="outlined"
                    onChange={this.handleChange('symptom_duration')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.symptom_duration}>
                {durations.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <br/>
            <FormGroup>
                {Object.entries(symptoms).map(( [symptom, checked], index) => {
                    return ( 
                        <FormControlLabel key={index}
                            control={<Checkbox checked={checked} onChange={this.handleSymptoms} name={symptom}/>}
                            label={symptom}
                        />
                    )
                })}
            </FormGroup>
            <FormGroup>
                {Object.entries(conditions).map(( [condition, checked], index) => {
                    return ( 
                        <FormControlLabel key={index}
                            control={<Checkbox checked={checked} onChange={this.handleConditions} name={condition}/>}
                            label={condition}
                        />
                    )
                })}
            </FormGroup>
            
            <br/>           

            {/* { this.state.lab_test && this.state.lab && this.state.open_lab
                ? <LabTest labTest={this.state.lab_test}/>
                : <Typography>Lab Results: Unavailable</Typography>
            } */}

            <br/>
            <TextField id="prediction" label="Prediction" disabled
                    margin="normal" style={styles.textField} value={this.state.prediction}
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            { !this.state.prediction
                ? <Button  onClick={this.getPrediction} color="primary" disabled={!this.state.lab}>
                    Get Risk Assessment
                  </Button>
                : <FormControlLabel label="Disagree ?" labelPlacement="start"
                        control={<Checkbox checked={this.state.disagree}
                            onChange={this.handleChange("disagree")} />}
                  />
            }
            <br/>
            <TextField id="notes" label="Notes" variant="outlined"
                    onChange={this.handleChange('comments')}
                    multiline margin="normal" fullWidth value={this.state.notes} />

            { !this.state.readOnly && (
                <div style={styles.controlBtns}>
                    <Button color="primary" variant="outlined"
                        style={{marginLeft: 10}}
                        onClick={this.discard}
                    >
                        Discard
                    </Button>
                    <Button color="primary" variant="contained"
                        style={{marginRight: 10, width: 100}}
                        onClick={this.save}
                    >
                        Save
                    </Button>

                </div>
            )}


            {this.state.error && (
                <Typography color="error">
                    {this.state.error}
                </Typography>
            )}

        </div>)
    }
}

export default Consultation