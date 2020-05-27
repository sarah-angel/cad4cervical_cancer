import React, { Component } from 'react'
import { Typography, Tabs, Tab } from '@material-ui/core'

const styles = {
    root: {
        maxWidth: 800,
        minWidth: 300,
        padding: 20,
        paddingTop: 0,
    },
    row: {
        display: 'flex',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    field: {
        width: '50%', 
        minWidth: 200, 
        marginBottom: 20
    },
}

class LabReport extends Component {
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
        tab: 0,
    }

    componentDidUpdate = this.componentDidMount = (props) => {
        let labTest = this.props.labTest

        if(this.state.lab_ID !== labTest._id)
        this.setState({
            lab_ID: labTest._id,
            hiv: (labTest.hiv === null) ? '' : labTest.hiv,
            chest_x_ray: (labTest.chest_x_ray === null) ? '' : labTest.chest_x_ray,
            ultrasound: (labTest.ultrasound === null) ? '' : labTest.ultrasound,
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

    handleTabChange = (event, value) => {
        this.setState({tab: value})
    }

    render(){
        return (<div style={styles.root}>
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

            <br/>
            {this.state.tab === 0 && (
            <div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Basophils (%) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.baso ? this.state.fbp.baso : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0 - 3)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Eosinophils (%) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.eos ? this.state.fbp.eos : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0 - 7)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Haemoglobin (g/dL) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.hb ? this.state.fbp.hb : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (12.5 - 17.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Lymphocytes (%) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.lymphocyte ? this.state.fbp.lymphocyte : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (14 - 46)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            MCH (pg) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.mch ? this.state.fbp.mch : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (27.0 - 34.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            MCV (fL) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.mcv ? this.state.mcv : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (80 - 98)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Neutrophils (%) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.neutrophil ? this.state.fbp.neutrophil: 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (40 - 74)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Platelets (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>3</Typography>/μL) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.plt ? this.state.fbp.plt : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (140 - 415)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            RBC (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>6</Typography>/μL) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.rbc ? this.state.fbp.rbc : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (4.10 - 5.60)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            WBC (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>3</Typography>/μL) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.wbc ? this.state.fbp.wbc : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (4.0 - 10.5)
                        </Typography>
                    </span>
                </div>
            </div>
            )}

            {this.state.tab === 1 && (
            <div>            
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Bilirubin (μmol/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.bilirubin ? this.state.urinalysis.bilirubin : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (3 - 17)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Creatinine (μmol/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.creatinine ? this.state.urinalysis.creatinine : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (M 68 - 150, W 68 - 98)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Epithelial (hpf) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.epithelial ? this.state.urinalysis.epithelial : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (1 - 5)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            pH (score)
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.ph ? this.state.urinalysis.ph : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (4.5 - 8.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Protein (mg/dL) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.protein ? this.state.urinalysis.protein : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0 - 14)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Urea (mmol/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.urea ? this.state.urinalysis.urea : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (2.5 - 6.7)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Uric Acid (mg) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.uric_acid ? this.state.urinalysis.uric_acid : 'n/a'}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (250 - 750)
                        </Typography>
                    </span>
                    {/* <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Confidence (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            356
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span> */}
                </div>
            </div>
            )}

            {this.state.tab === 2 && (
            <div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            HIV
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.hiv ? 'Positive' : 'Negative'}
                        </Typography>
                        {/* <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography> */}
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Chest X-Ray
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.chest_x_ray ? 'Yes' : 'No'}
                        </Typography>
                        {/* <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography> */}
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Ultrasound
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.ultrasound ? 'Yes' : 'No'}
                        </Typography>
                        {/* <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography> */}
                    </span>
                    {/* <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Confidence (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            356
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span> */}
                </div>
            </div>
            )}
        </div>
        )
    }
}

export default LabReport