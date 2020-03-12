import React, { Component } from 'react'
import { TextField, InputAdornment, MenuItem, Box, Typography, Button } from '@material-ui/core'
import { save } from '../../helpers/api-lab'

/**Lab Test Schema
 * consultation_ID - FK
 * created
 * hiv (true/false)
 * chest-x-ray (true/false)
 * ultrasound (true/false)
 * fbp: 
 *      baso
 *      eos
 *      hb
 *      lymphocyte
 *      mch
 *      mcv
 *      neutrophil
 *      plt
 *      rbc
 *      wbc
 * urinalysis:
 *      bilirubin
 *      creatinine
 *      epithelial
 *      ph
 *      protein
 *      urea
 *      uric-acid
 *
 */
const styles = {
    root: {
        maxWidth: 800,
        margin: '0 auto'
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
        marginRight: 30,
        maxWidth: 200,
    },
    selectField: {
        marginLeft: 5,
        marginRight: 5,
        width: 150,
    },
    controlBtns: {
        alignContent: 'center'
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

class LabTest extends Component {
    state = {
        hiv: '',
        chest_x_ray: '',
        ultrasound: '',
        fbp: {
            baso: null,
            eos: null,
            hp: null,
            lymphocyte: null,
            mch: null,
            mcv: null,
            neutrophil: null,
            plt: null,
            rbc: null,
            wbc: null,
        },
        urinalysis: {
            bilirubin: null,
            creatinine: null,
            epithelial: null,
            ph: null,
            protein: null,
            urea: null,
            uric_acid: null,
        },
        error: '',
    }

    saveTest = () => {
        var test = {
            patient_ID: this.props.patient._id,
            hiv: (this.state.hiv === '') ? null : this.state.hiv,
            chest_x_ray: (this.state.chest_x_ray === '') ? null : this.state.chest_x_ray,
            ultrasound: (this.state.ultrasound === '') ? null : this.state.ultrasound,
            fbp: this.state.fbp,
            urinalysis: this.state.urinalysis
        }
        save(test).then((data) => {
            if( data.error )
                this.setState({error: data.error})
            else{
                //To-Do: show success message
                //reset state and go to lab home
                window.location.href="/"
            }
        })
    }

    //Group is used for nested objects
    handleChange = ( name, group) => event => {
        var newVal = event.target.value
        if (group){
            this.setState(prevState => ({ 
                [group] : { 
                    ...prevState[group],
                    [name] : newVal}
            }))
        } else
            this.setState({[name]: newVal})
    }

    render(){
        return (<div style={styles.root}>
            <Typography style={styles.title} variant="h6">Test Results</Typography>
            <Box borderBottom={1} style={styles.bottomBorder} color="text.disabled" />

            <br/>        
            <Typography>Full Blood Picture</Typography>
            <br/>
            <TextField id="baso" label="Basophil" onChange={this.handleChange('baso', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="eos" label="Eosinophil" onChange={this.handleChange('eos', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="hp" label="HP" onChange={this.handleChange('hp', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="lymphocyte" label="Lymphocyte" onChange={this.handleChange('lymphocyte', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="mch" label="MCH" onChange={this.handleChange('mch', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="mcv" label="MCV" onChange={this.handleChange('mcv', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="neutrophil" label="Neutrophil" onChange={this.handleChange('neutrophil', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="plt" label="Platelet" onChange={this.handleChange('plt', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="rbc" label="RBC" onChange={this.handleChange('rbc', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="wbc" label="WBC" onChange={this.handleChange('wbc', 'fbp')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <br/>
            <Typography>Urinalysis</Typography>
            <br/>
            <TextField id="bilirubin" label="Bilirubin" onChange={this.handleChange('bilirubin', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="creatinine" label="Creatinine" onChange={this.handleChange('creatinine', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="epithelial" label="Epithelial" onChange={this.handleChange('epithelial', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="ph" label="pH" onChange={this.handleChange('ph', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="protein" label="Protein" onChange={this.handleChange('protein', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="urea" label="Urea" onChange={this.handleChange('urea', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="uric_acid" label="Uric Acid" onChange={this.handleChange('uric_acid', 'urinalysis')}
                    margin="normal" style={styles.textField} 
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <br/>
            Other
            <br/>
            <TextField id="hiv" label="HIV" onChange={this.handleChange('hiv')}
                    margin="normal" style={styles.textField, styles.selectField}
                    select value={this.state.hiv}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            <TextField id="chest_x_ray" label="Chest X-Ray" onChange={this.handleChange('chest_x_ray')}
                    margin="normal" style={styles.textField, styles.selectField}
                    select value={this.state.chest_x_ray}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            <TextField id="ultrasound" label="Ultrasound" onChange={this.handleChange('ultrasound')}
                    margin="normal" style={styles.textField, styles.selectField}
                    select value={this.state.ultrasound}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            <br/>

            <div style={styles.controlBtns}>
                <Button color="primary" onClick={this.saveTest}>Save</Button>
                <Button color="primary">Discard</Button>
            </div>
        </div>)
    }
}

export default LabTest