import React, { Component } from 'react'
import { Typography, List, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { getHistory } from '../../helpers/api-consultation'
import Consultation from './Consultation'

const styles = {
    root: {        
        margin: 'auto',
        marginTop: 20,
        maxWidth: 300,
    },
    list: {
        maxWidth: 250,
        //margin: '0 auto'
    },
    expandBtn: {
        textTransform: 'none', 
        position: 'relative', 
        left: '50%', 
        transform: 'translate(-50%, 0)',
    },
}

class History extends Component {
    state = {
        patient: this.props.patient,
        history: [],
        created: '',
        viewReportIndex: null,
        expand: false,
        error: ''
    }

    componentDidMount() {
        getHistory(this.props.patient._id).then((data) => {
            if (data.error)
                this.setState({error: data.error})
            else{
                console.log(data)
                this.setState({history: data})
            }
        })
    }

    render() {
        const selectedReport = this.state.history[this.state.viewReportIndex]
        return (<div style={styles.root}>
            {/* { this.state.viewReportIndex 
            ? <div>
                <div style={styles.reportHead}>
                    <Button color="primary" 
                        onClick={() => this.setState({viewReportIndex: null})}>
                        <ArrowBackIcon/>
                        &nbsp;Back
                    </Button>
                    <span style={{float: "right"}}>{selectedReport.created}</span>
                </div>
                <Consultation patient={this.state.patient} report={selectedReport} />
             </div>
            :<List style={styles.list}>
                <ListItem>
                    <ListItemText primary="Date" />
                    <ListItemText primary="Prediction in %" />
                
                </ListItem>
                {this.state.history.map((item, index) => {
                    return(
                        <ListItem key={index}>
                            <ListItemText primary={item.created} />
                            <ListItemText primary={item.prediction} />
                            <ListItemSecondaryAction>
                                <Button color="primary" 
                                    onClick={() => this.setState({viewReportIndex: index + 1})}>
                                    View Report
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
            } */}

            <Typography>
                Medical History
            </Typography>

            <List style={styles.list}>
                {/* <ListItem>
                    <ListItemText primary="" />
                    <ListItemText primary="Cancer" />
                    <ListItemText primary="Prediction in %" />
                
                </ListItem> */}
                {this.state.history.map((item, index) => {
                    const date = new Date(item.created)
                    const dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                    
                    //Only show three rows when not expanded
                    if ((this.state.expand || index < 3) && item.diagnosis)
                    return(
                        <ListItem key={index} onClick={() => this.setState({viewReportIndex: index})} style={{padding: 5}}>
                            <Button style={{width: '100%', textAlign: 'left', padding: 5, textTransform: 'none'}}>
                                <ListItemText primary={dateString} style={{color: 'grey', fontSize: 15}} disableTypography/>
                                <ListItemText primary={item.diagnosis.diagnosis ? 'Positive' : 'Negative'} />
                                <ListItemText primary={item.diagnosis.confidence ? item.diagnosis.confidence + "%" : "n/a"} />
                                {/* <ListItemSecondaryAction>
                                    <Button color="primary" 
                                        onClick={() => this.setState({viewReportIndex: index + 1})}>
                                        View
                                    </Button>
                                </ListItemSecondaryAction> */}
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
            
            {this.state.expand 
            ? (
               <Button color="primary" onClick={() => this.setState({expand: false})}
                    style={styles.expandBtn}
                    endIcon={<ExpandLessIcon />} 
                >
                    View Less
                </Button> 
            ):(
                <Button color="primary" onClick={() => this.setState({expand: true})}
                    style={styles.expandBtn}
                    endIcon={<ExpandMoreIcon />} 
                >
                    View More
                </Button>   
            )}   
        </div>)
    }
}

export default History