import React, { Component } from 'react'
import { Typography, Tabs, Tab } from '@material-ui/core'

const styles = {
    root: {
        maxWidth: 800,
        minWidth: 300,
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

    componentDidMount = (props) => {
        let labTest = this.props.labTest
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
                            Basophil (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.baso}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Eosinophil (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.eos}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Haemoglobin (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.hb}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Lymphocyte (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.lymphocyte}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            MCH (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.mch}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            MCV (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.mcv}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Neutrophil (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.neutrophil}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Platelet (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.plt}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            RBC (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.rbc}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            WBC (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.fbp.wbc}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
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
                            Bilirubin (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.bilirubin}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Creatinine (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.creatinine}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Epithelial (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.epithelial}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            pH (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.ph}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Protein (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.protein}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Urea (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.urea}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Uric Acid (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            {this.state.urinalysis.uric_acid}
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
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
                            Confidence (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            356
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Confidence (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            356
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Confidence (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            356
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14, display: 'flex'}}>
                            Confidence (10<Typography style={{fontSize: 10, verticalAlign: 'top'}}>9</Typography>/L) 
                        </Typography>
                        <Typography style={{textAlign: 'left'}}>
                            356
                        </Typography>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Normal Range (0.6 - 13.0)
                        </Typography>
                    </span>
                </div>
            </div>
            )}
        </div>
        )
    }
}

export default LabReport