import React, { Component } from 'react'
import { TextField, InputAdornment, MenuItem, Box, Typography, Button, Tabs, Tab } from '@material-ui/core'

import { save } from '../../helpers/api-lab'

const styles = {
    root: {
        maxWidth: 800,
        //margin: 'auto',
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
        marginRight: 20,
        //maxWidth: 400,
        width: '60%',
    },
    selectField: {
        marginLeft: 5,
        marginRight: 20,
        width: '60%',
    },
    controlBtns: {
        display: 'flex',
        flexDirection: 'row-reverse',
        position: 'sticky',
        bottom: 20,
        width: '100%',
        height: '100%',
        // position: 'static',
        // right: '0%',
        // bottom: 0,
        //left: '100%',
        //transform: 'translate(-100%, 0)',
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
            baso: '',
            eos: '',
            hb: '',
            lymphocyte: '',
            mch: '',
            mcv: '',
            neutrophil: '',
            plt: '',
            rbc: '',
            wbc: '',
        },
        urinalysis: {
            bilirubin: '',
            creatinine: '',
            epithelial: '',
            ph: '',
            protein: '',
            urea: '',
            uric_acid: '',
        },
        readOnly: false,
        tab: 0,
        error: '',
    }


    //If labTest is in props then component is read Only
    componentDidMount = async(props) => {
        var labTest = this.props.labTest
        if (labTest) {
            this.setState({readOnly: true})
            this.setState({
                hiv: (labTest.hiv === null) ? '' : `${labTest.hiv}`,
                chest_x_ray: (labTest.chest_x_ray === null) ? '' : `${labTest.chest_x_ray}`,
                ultrasound: (labTest.ultrasound === null) ? '' : `${labTest.ultrasound}`,
                fbp: {
                    baso: labTest.fbp.baso ? labTest.fbp.baso : '',
                    eos: labTest.fbp.eos ? labTest.fbp.eos : '',
                    hb: labTest.fbp.hb ? labTest.fbp.hb : '',
                    lymphocyte: labTest.fbp.lymphocyte ? labTest.fbp.lymphocyte : '',
                    mch: labTest.fbp.mch ? labTest.fbp.mch : '',
                    mcv: labTest.fbp.mcv ? labTest.fbp.mcv : '',
                    neutrophil: labTest.fbp.neutrophil ? labTest.fbp.neutrophil : '',
                    plt: labTest.fbp.plt ? labTest.fbp.plt : '',
                    rbc: labTest.fbp.rbc ? labTest.fbp.rbc : '',
                    wbc: labTest.fbp.wbc ? labTest.fbp.wbc : '',
                },
                urinalysis: {
                    bilirubin: labTest.urinalysis.bilirubin ? labTest.urinalysis.bilirubin : '',
                    creatinine: labTest.urinalysis.creatinine ? labTest.urinalysis.creatinine : '',
                    epithelial: labTest.urinalysis.epithelial ? labTest.urinalysis.epithelial : '',
                    ph: labTest.urinalysis.ph ? labTest.urinalysis.ph : '',
                    protein: labTest.urinalysis.protein ? labTest.urinalysis.protein : '',
                    urea: labTest.urinalysis.urea ? labTest.urinalysis.urea : '',
                    uric_acid: labTest.urinalysis.uric_acid ? labTest.urinalysis.uric_acid : '',
                }
            })
        }
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
                window.location.href="/lab"
            }
        })
    }

    handleTabChange = (event, newValue) => {
        this.setState({tab: newValue})
    }

    //To-Do: Ask user for confirmation 
    //reset state and go to lab home
    discard = (event) => {
        window.location.href="/lab"
    }

    //Group is used for nested objects
    handleChange = ( name, group) => event => {
        var newVal = event.target.value
        if (!this.state.readOnly){
            if (group){
                this.setState(prevState => ({ 
                    [group] : { 
                        ...prevState[group],
                        [name] : newVal}
                }))
            } else
                this.setState({[name]: newVal})
        }
    }

    render(){
        return (<div style={styles.root}>
            <Typography style={styles.title} >
                Lab Test Results
            </Typography>
            <Box borderBottom={1} style={styles.bottomBorder} color="text.disabled" />

            <br/>  

            <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                //centered
            >              
                <Tab label="Full Blood Picture" />
                <Tab label="Urinalysis" />
                <Tab label="Other" />
            </Tabs>

            {this.state.tab === 0
            ? (
            <div>
            <div style={{display: 'flex'}}>
            <TextField id="baso" label="Basophil" variant="outlined"
                    onChange={this.handleChange('baso', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.baso} 
                    // helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <Typography style={{color: 'grey', fontSize: 15, marginTop: 30}}> Normal Range (0.0 - 13.0)</Typography>
            </div>
            <TextField id="eos" label="Eosinophil" variant="outlined"
                    onChange={this.handleChange('eos', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.eos} 
                    // helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="hb" label="Haemoglobin" variant="outlined"
                    onChange={this.handleChange('hb', 'fbp')} 
                    margin="normal" style={styles.textField} value={this.state.fbp.hb} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="lymphocyte" label="Lymphocyte" variant="outlined"
                    onChange={this.handleChange('lymphocyte', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.lymphocyte} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="mch" label="MCH" variant="outlined"
                    onChange={this.handleChange('mch', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.mch} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="mcv" label="MCV" variant="outlined"
                    onChange={this.handleChange('mcv', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.mcv} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="neutrophil" label="Neutrophil" variant="outlined"
                    onChange={this.handleChange('neutrophil', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.neutrophil} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="plt" label="Platelet" variant="outlined"
                    onChange={this.handleChange('plt', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.plt} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="rbc" label="RBC" variant="outlined"
                    onChange={this.handleChange('rbc', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.rbc} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="wbc" label="WBC" variant="outlined"
                    onChange={this.handleChange('wbc', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.wbc} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            </div>
            ) : ( this.state.tab === 1 ) ? (        
            <div>
            <TextField id="bilirubin" label="Bilirubin" variant="outlined"
                    onChange={this.handleChange('bilirubin', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.bilirubin} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="creatinine" label="Creatinine" variant="outlined"
                    onChange={this.handleChange('creatinine', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.creatinine} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="epithelial" label="Epithelial" variant="outlined"
                    onChange={this.handleChange('epithelial', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.epithelial} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="ph" label="pH" variant="outlined"
                    onChange={this.handleChange('ph', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.ph} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="protein" label="Protein" variant="outlined"
                    onChange={this.handleChange('protein', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.protein} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="urea" label="Urea" variant="outlined"
                    onChange={this.handleChange('urea', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.urea} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            <TextField id="uric_acid" label="Uric Acid" variant="outlined"
                    onChange={this.handleChange('uric_acid', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.uric_acid} 
                    helperText="Normal Range (0.5 - 13)"
                    InputProps={{endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}/>
            </div>
            ) : (
            <div>
            <TextField id="hiv" label="HIV" variant="outlined"
                    onChange={this.handleChange('hiv')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.hiv}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            <TextField id="chest_x_ray" label="Chest X-Ray" variant="outlined"
                    onChange={this.handleChange('chest_x_ray')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.chest_x_ray}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            <TextField id="ultrasound" label="Ultrasound" variant="outlined"
                    onChange={this.handleChange('ultrasound')}
                    margin="normal" style={styles.selectField}
                    select value={this.state.ultrasound}>
                {select.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}    
            </TextField>
            </div>
            )}
            <br/>
            
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
                        onClick={this.saveTest}
                    >
                        Save
                    </Button>
                    
                </div>
            )}
            
            { this.state.error && (
                <Typography color="error">
                    {this.state.error}
                </Typography>
            )}
        </div>)
    }
}

export default LabTest