import React, { Component } from 'react'
import { TextField, InputAdornment, MenuItem, Box, Typography, Button, Tabs, Tab, Modal, Card } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { save } from '../../helpers/api-lab'

const styles = {
    root: {
        maxWidth: 800,
        margin: '0 auto',
        //width: 800,
        minWidth: 300,
        overflow: "hidden",
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
        justifyContent: "right",
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
        openModal: false,
        inputError: {},
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
                window.location.href="/"
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

                if (isNaN(newVal)){
                    this.setState(prevState => ({
                        inputError: {
                            ...prevState.inputError,
                            [name]: true
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        inputError: {
                            ...prevState.inputError,
                            [name]: false
                        }
                    }))
                }
            } else
                this.setState({[name]: newVal})
        }
    }

    render(){
        return (<div style={styles.root}>
    
            {this.state.error && 
                <Alert severity="error" style={{width: "70%", margin: "auto"}}
                    onClose={() => this.setState({error: null})}
                >
                    {this.state.error}
                </Alert>
            }

            <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                //centered 
                variant="scrollable"
            >              
                <Tab label="Full Blood Picture" />
                <Tab label="Urinalysis" />
                <Tab label="Other" />
            </Tabs>

            {this.state.tab === 0
            ? (
            <div>
            <TextField id="baso" label="Basophils" variant="outlined"
                    error={this.state.inputError.baso}
                    onChange={this.handleChange('baso', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.baso} 
                    helperText="Normal Range (0 - 3)"
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            <TextField id="eos" label="Eosinophils" variant="outlined"
                    error={this.state.inputError.eos}
                    onChange={this.handleChange('eos', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.eos} 
                    helperText="Normal Range (0 - 7)"
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            <TextField id="hb" label="Haemoglobin" variant="outlined"
                    error={this.state.inputError.hb}
                    onChange={this.handleChange('hb', 'fbp')} 
                    margin="normal" style={styles.textField} value={this.state.fbp.hb} 
                    helperText="Normal Range (12.5 - 17.0)"
                    InputProps={{endAdornment: <InputAdornment position="end">g/dL</InputAdornment>}}/>
            <TextField id="lymphocyte" label="Lymphocytes" variant="outlined"
                    error={this.state.inputError.lymphocyte}
                    onChange={this.handleChange('lymphocyte', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.lymphocyte} 
                    helperText="Normal Range (14 - 46)"
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            <TextField id="mch" label="MCH" variant="outlined"
                    error={this.state.inputError.mch}
                    onChange={this.handleChange('mch', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.mch} 
                    helperText="Normal Range (27.0 - 34.0)"
                    InputProps={{endAdornment: <InputAdornment position="end">pg</InputAdornment>}}/>
            <TextField id="mcv" label="MCV" variant="outlined"
                    error={this.state.inputError.mcv}
                    onChange={this.handleChange('mcv', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.mcv} 
                    helperText="Normal Range (80 - 98)"
                    InputProps={{endAdornment: <InputAdornment position="end">fL</InputAdornment>}}/>
            <TextField id="neutrophil" label="Neutrophils" variant="outlined"
                    error={this.state.inputError.neutrophil}
                    onChange={this.handleChange('neutrophil', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.neutrophil} 
                    helperText="Normal Range (40 - 74)"
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
            <TextField id="plt" label="Platelets" variant="outlined"
                    error={this.state.inputError.plt}
                    onChange={this.handleChange('plt', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.plt} 
                    helperText="Normal Range (140 - 415)"
                    InputProps={{endAdornment: 
                        <InputAdornment position="end">
                            <Typography style={{display: "flex", color: 'grey'}}>10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>3</Typography>/μL</Typography>
                        </InputAdornment>
                    }}/>
            <TextField id="rbc" label="RBC" variant="outlined"
                    error={this.state.inputError.rbc}
                    onChange={this.handleChange('rbc', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.rbc} 
                    helperText="Normal Range (4.10 - 5.60)"
                    InputProps={{endAdornment: 
                        <InputAdornment position="end">
                            <Typography style={{display: 'flex', color: 'grey'}}>10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>6</Typography>/μL</Typography>
                        </InputAdornment>
                    }}/>
            <TextField id="wbc" label="WBC" variant="outlined"
                    error={this.state.inputError.wbc}
                    onChange={this.handleChange('wbc', 'fbp')}
                    margin="normal" style={styles.textField} value={this.state.fbp.wbc} 
                    helperText="Normal Range (4.0 - 10.5)"
                    InputProps={{endAdornment: 
                        <InputAdornment position="end">
                            <Typography style={{display: 'flex', color: 'grey'}}>10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>3</Typography>/μL</Typography>
                        </InputAdornment>
                    }}/>
            </div>
            ) : ( this.state.tab === 1 ) ? (        
            <div>
            <TextField id="bilirubin" label="Bilirubin" variant="outlined"
                    error={this.state.inputError.bilirubin}
                    onChange={this.handleChange('bilirubin', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.bilirubin} 
                    helperText="Normal Range (3 - 17)"
                    InputProps={{endAdornment: <InputAdornment position="end">μmol/L</InputAdornment>}}/>
            <TextField id="creatinine" label="Creatinine" variant="outlined"
                    error={this.state.inputError.creatinine}
                    onChange={this.handleChange('creatinine', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.creatinine} 
                    helperText="Normal Range (M 68 - 150, W 6 - 98)"
                    InputProps={{endAdornment: <InputAdornment position="end">μmol/L</InputAdornment>}}/>
            <TextField id="epithelial" label="Epithelial" variant="outlined"
                    error={this.state.inputError.epithelial}
                    onChange={this.handleChange('epithelial', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.epithelial} 
                    helperText="Normal Range (1 - 5)"
                    InputProps={{endAdornment: <InputAdornment position="end">hpf</InputAdornment>}}/>
            <TextField id="ph" label="pH" variant="outlined"
                    error={this.state.inputError.ph}
                    onChange={this.handleChange('ph', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.ph} 
                    helperText="Normal Range (4.5 - 8.0)"
                    InputProps={{endAdornment: <InputAdornment position="end">Score</InputAdornment>}}/>
            <TextField id="protein" label="Protein" variant="outlined"
                    error={this.state.inputError.protein}
                    onChange={this.handleChange('protein', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.protein} 
                    helperText="Normal Range (0 - 14)"
                    InputProps={{endAdornment: <InputAdornment position="end">mg/dL</InputAdornment>}}/>
            <TextField id="urea" label="Urea" variant="outlined"
                    error={this.state.inputError.urea}
                    onChange={this.handleChange('urea', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.urea} 
                    helperText="Normal Range (2.5 - 6.7)"
                    InputProps={{endAdornment: <InputAdornment position="end">mmol/L</InputAdornment>}}/>
            <TextField id="uric_acid" label="Uric Acid" variant="outlined"
                    error={this.state.inputError.uric_acid}
                    onChange={this.handleChange('uric_acid', 'urinalysis')}
                    margin="normal" style={styles.textField} value={this.state.urinalysis.uric_acid} 
                    helperText="Normal Range (250 - 750)"
                    InputProps={{endAdornment: <InputAdornment position="end">mg</InputAdornment>}}/>
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
                        onClick={() => this.setState({openModal: true})}
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


            <Modal open={this.state.openModal} style={styles.modal} >
                <Card style={styles.confirmCard} >
                    <Typography style={{marginTop: 10}} >
                        Are you sure you want to discard this lab test?
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
            
        </div>)
    }
}

export default LabTest