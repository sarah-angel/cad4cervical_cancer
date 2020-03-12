import React, { Component } from 'react'
import { TextField, Typography, InputAdornment, MenuItem, Button } from 'material-ui'
import  AddBoxIcon  from '@material-ui/icons/AddBox'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'

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
        symptoms: {},
        weight: null,
        height: null,
        temperature: null,
        smokes: '',
        alcohol: '',
        region: null,
        children: null,
        family_history: null,
        prediction: null,
        comments: null,
        addSymptom: [],
        error: '',
    }

    addSymptomField = event => {      
        this.setState( prev => ({ addSymptom: [...prev.addSymptom, 'x'] }))
    }

    removeSymptomField = name => event => {
        this.setState({[name]: ''})

    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }
    
    render() {

        return(<div style={styles.form}>
            <TextField id="weight" label="Weight" onChange={this.handleChange('weight')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="height" label="Height" onChange={this.handleChange('height')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}/>
            <TextField id="temperature" label="Temperature" onChange={this.handleChange('temperature')}
                    margin="normal" style={styles.textField}
                    InputProps={{endAdornment: <InputAdornment position="end">°C</InputAdornment>}}/>
            <TextField id="children" label="Children" onChange={this.handleChange('children')}
                    margin="normal" style={styles.textField} />
            <TextField id="family_history" label="Family History" onChange={this.handleChange('family_history')}
                    margin="normal" style={styles.textField} />
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
            
            <TextField id="prediction" label="Prediction" disabled
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            <Button color="primary">Get Prediction</Button>
            <br/>
            <TextField id="comments" label="Comments" onChange={this.handleChange('comments')}
                    margin="normal" fullWidth />

            <div style={styles.controlBtns}>
                <Button color="primary">Save</Button>
                <Button color="primary">Discard</Button>
            </div>
            
        </div>)
    }
}

export default Consultation