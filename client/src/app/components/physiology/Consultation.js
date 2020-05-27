import React, { Component } from 'react'
import { TextField, Typography,
     InputAdornment, MenuItem,
     Button, Checkbox, 
     FormControlLabel, Tabs, Tab
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { getPending, getPrediction, save } from '../../helpers/api-consultation'
import { getByConsultationID } from '../../helpers/api-lab'
import auth from '../../auth/auth-helper'
import LabReport from '../lab/LabReport'
import symptoms from './symptoms'
import conditions from './conditions'

const styles = {
    root: {
        maxWidth: 800,
        margin: '0 auto',
        //width: 800,
        minWidth: 300,
        padding: 20,
        marginBottom: 20,
        justifyContent: 'center',
    },
    title: {
        marginTop: 5,
        marginBottom: 5,
    },
    bottomBorder: {
        width: '100%',
        marginTop: 5,
    },
    textField: {
        marginLeft: 5,
        //marginRight: 30,
        //maxWidth: 600,
        //width: 500,
        width: '100%',
        minWidth: 300,
        //margin: '0 auto',
    },
    textFieldDiv: {
        maxWidth: '60%',
        minWidth: 300,
        //margin: 'auto'
    },
    selectField: {
        marginLeft: 5,
        //marginRight: 5,
        width: '32%',
        minWidth: 150,
    },
    controlBtns: {
        display: 'flex',
        flexDirection: 'row-reverse',
        position: 'sticky',
        bottom: 20,
        width: '100%',
        height: '100%',
    },
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
        weight: '',
        height: '',
        temperature: '',
        smokes: '',
        alcohol: '',
        region: '',
        children: '',
        family_history: '',
        symptom_duration: '',
        existing_conditions: [],
        diagnosis: '',
        notes: '',
        disagree: false,
        lab: false,
        open_lab: true,
        readOnly: false,
        error: null,
        symptoms: [],
        tab: 0,
        diagnosisBtn: false,
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
        await getPending(patient).then( (res) => {
            if(res.error)
                this.setState({error: res.error})
            else{
                data = res
            }
        }).then(res => {
            //Get lab results       
            if (data._id)
            getByConsultationID(data._id).then((labData) => {
                if( !labData ) return

                if(labData.error)
                    this.setState({error: labData.error})
                else{
                    this.setState({lab: true, lab_test: labData, diagnosisBtn: true})
                }
            })
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
            notes: !data.notes ? '' : data.notes,
            existing_conditions: data.existing_conditions,
        })

    }

    //Only triggered if lab test is available
    getPrediction = () => {
        //disable get diagnosis button
        this.setState({diagnosisBtn: false})

        var info = {
            age: this.props.patient.age,
            gender: this.props.patient.gender,
            region: this.props.patient.region,
            weight: this.state.weight,
            height: this.state.height,
            temperature: this.state.temperature,
            smokes: (this.state.smokes === '') ? null : this.state.smokes,
            alcohol: (this.state.alcohol === '') ? null : this.state.alcohol,
            children: this.state.children,
            family_history: (this.state.family_history === '') ? null : this.state.family_history,
            symptom_duration: (this.state.symptom_duration === '') ? null : this.symptom_duration,
            existing_conditions: this.state.existing_conditions,
            symptoms: this.state.symptoms,
            hiv: this.state.lab_test.hiv,
            chest_x_ray: this.state.lab_test.chest_x_ray,
            ultrasound: this.state.lab_test.ultrasound,
            fbp: this.state.lab_test.fbp,
            urinalysis: this.state.lab_test.urinalysis
        }

        getPrediction(info).then((data) => {
            if(data.error)
                this.setState({error: data.error, diagnosisBtn: true})
            else{
                this.setState({diagnosis: data})
            }
        })
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
            family_history: (this.state.family_history === '') ? null : this.state.family_history,
            symptom_duration: (this.state.symptom_duration === '') ? null : this.symptom_duration,
            existing_conditions: this.state.existing_conditions,
            diagnosis: this.state.diagnosis,
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
            if ( name == "disagree"){
                this.setState({disagree: event.target.checked})
                this.setState(prevState => ({diagnosis: {diagnosis: !prevState.diagnosis.diagnosis, confidence: null}}))
            }
            else
                this.setState({[name]: event.target.value})
    }

    handleSymptoms = values => {
        this.setState({symptoms: values})
    }

    handleConditions = (values) => {
        this.setState({existing_conditions: values})
    }

    handleTabChange = (event, value) => {
        this.setState({tab: value})
    }

    render() {
        return(<div style={styles.root}>

            <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >              
                <Tab label="Today's Consultation" />
                <Tab label="Lab Test" />
                <Tab label="Diagnosis" />
            </Tabs>

            {this.state.tab === 0 && (
            <div style={styles.textFieldDiv}>                
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
                <br/>
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
                        margin="normal" style={styles.textField}
                        select value={this.state.symptom_duration}>
                    {durations.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br/>
                <br/>
                <Autocomplete
                    multiple disableCloseOnSelect
                    id="symptoms"
                    value={this.state.symptoms}
                    options={Object.keys(symptoms)}
                    getOptionLabel={(option) => option}
                    style={styles.textField}
                    renderOption={(option, {selected}) => {
                        return(
                            <FormControlLabel
                                control={<Checkbox checked={selected} name={option}/>}
                                label={option}
                            />
                    )}}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Symptom"
                            variant="outlined" label="Symptoms"
                        />
                    )}
                    onChange={(event, values) => this.handleSymptoms(values)}
                />
                <br/>
                <Autocomplete
                    multiple disableCloseOnSelect
                    id="conditions"
                    value={this.state.existing_conditions}
                    options={Object.keys(conditions)}
                    getOptionLabel={(option) => option}
                    style={styles.textField}
                    renderOption={(option, {selected}) => {
                        return(
                            <FormControlLabel
                                control={<Checkbox checked={selected} name={option}/>}
                                label={option}
                            />
                    )}}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Condition"
                            variant="outlined" label="Existing Conditions"
                        />
                    )}
                    onChange={(event, values) => this.handleConditions(values)}
                />
                <br/>           
            </div>
            )}

            {this.state.tab === 1 && (
                <div>
                    { this.state.lab_test && this.state.lab && this.state.open_lab
                        ? <LabReport labTest={this.state.lab_test}/>
                        : <Typography>Lab Results: Unavailable</Typography>
                    }
                </div>
            )}
            

            {this.state.tab === 2 && (
            <div>
                { !this.state.diagnosis
                    ? <Typography>
                        Diagnosis not available
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
                                <Typography style={{textAlign: 'right'}}>
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
            </div>
            )}

            { !this.state.readOnly && (
                <div style={styles.controlBtns}>
                    <Button color="primary" variant="outlined"
                        style={{marginLeft: 10}}
                        onClick={this.discard}
                    >
                        Discard
                    </Button>
                    { this.state.diagnosisBtn && 
                        <Button color="secondary" variant="contained"
                            style={{marginLeft: 10}} disabled={ !this.state.diagnosisBtn }
                            onClick={this.getPrediction}
                        >
                            Get Diagnosis
                        </Button>
                    }
                    <Button color="primary" variant="contained"
                        style={{marginLeft: 10, width: 100}}
                        onClick={this.save}
                    >
                        Save
                    </Button>

                </div>
            )}


            { typeof this.state.error ===  'string' && (
                <Typography color="error">
                    {this.state.error}
                </Typography>
            )}
            { this.state.error && typeof this.state.error.message === 'string' && (
                <Typography color="error">
                    {this.state.error.message}
                </Typography>
            )}

        </div>)
    }
}

export default Consultation