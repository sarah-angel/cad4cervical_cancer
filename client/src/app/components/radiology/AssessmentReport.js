import React, { Component } from 'react'
import { Typography, Checkbox, Button, TextField } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { assessImage } from '../../helpers/api-radiology'

const styles = {
    root: {
        maxWidth: 800,
        margin: '0 auto',
        minWidth: 300,
        padding: 30,
        //marginLeft: 20,
    },
    reportHead: {
        marginLeft: -30,
    },
    image: {
        minHeight: 100,
        maxHeight: 500,
        width: '100%',
        padding: 5
    },
    row: {
        display: 'flex',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    field: {
        width: '40%', 
        minWidth: 200, 
        marginBottom: 20
    },
}

class AssessmentReport extends Component{
    state = {
        patient: this.props.patient,
        report: this.props.report,
        heatmap: null,
        showOriginal: true,
        error: '',
    }
    
    componentDidMount = () => {
        var image = {image: this.props.report.image}

        this.setState({report: this.props.report})
        
        assessImage(image).then((data) => {
            if(data.error)
                this.setState({error: data.error})
            else{
                this.setState({heatmap: data.heatmap})
            }
        })            
    }

    componentDidUpdate = () => {
        var image = {image: this.props.report.image}

        if(this.state.report !== this.props.report){
            this.setState({report: this.props.report})
            
            assessImage(image).then((data) => {
                if(data.error)
                    this.setState({error: data.error})
                else{
                    this.setState({heatmap: data.heatmap})
                }
            })
        }
            
    }

    getDateString = (date) => {
        let dateObj = new Date(date)
        return dateObj.getDate() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear()
                    
    }

    render() {
        return(
            <div style={styles.root}>
                <div style={styles.reportHead}>
                    <Button color="primary" 
                        onClick={() => this.props.setViewReportIndex(null)}>
                        <ArrowBackIcon/>
                        &nbsp;Back
                    </Button>
                    <span style={{float: "right"}}>{this.getDateString(this.state.report.created)}</span>
                </div>

                { this.state.showOriginal 
                    ?<div>
                       <img src={this.state.report.image} alt="Patients MRI" style={styles.image} />   
                       <Button color="primary"
                            onClick={() => this.setState({showOriginal: false})} >
                           View Texture Heatmap
                        </Button>   
                     </div>
                    :<div>
                        <img src={this.state.heatmap} alt="Heatmap of MRI" style={styles.image} />
                        <Button color="primary"
                            onClick={() => this.setState({showOriginal: true})}>
                            View Original
                        </Button>
                     </div>
                }
                
                <div style={styles.row}>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Cervical Cancer
                        </Typography>
                        <Typography>
                            {this.state.report.diagnosis.diagnosis ? 'Positive' : 'Negative'}
                        </Typography>
                    </span>
                    <span style={styles.field}>
                        <Typography style={{color: 'grey', fontSize: 14}}>
                            Confidence
                        </Typography>
                        <Typography style={{}}>
                            {this.state.report.diagnosis.confidence ? this.state.report.diagnosis.confidence + '%' : 'n/a'}
                        </Typography>
                    </span>
                </div>
                <div>
                    <Typography style={{color: 'grey', fontSize: 14}}>
                        Clinical Notes
                    </Typography>
                    <Typography>
                        {this.state.report.notes}
                    </Typography>
                </div>
            </div>
        )
    }
}

export default AssessmentReport