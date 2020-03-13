import React, { Component } from 'react'
import { Typography, List, Button } from 'material-ui'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { getHistory } from '../../helpers/api-consultation'
import Consultation from './Consultation'

const styles = {
    root: {
        maxWidth: 900,
        margin: '0 auto'
    },
    list: {
        maxWidth: 800,
        margin: '0 auto'
    }
}

class History extends Component {
    state = {
        patient: this.props.patient,
        history: [],
        created: '',
        viewReportIndex: null,
        error: ''
    }

    componentDidMount() {
        getHistory(this.props.patient._id).then((data) => {
            if (data.error)
                this.setState({error: data.error})
            else{
                this.setState({history: data})
            }
        })
    }

    render() {
        const selectedReport = this.state.history[this.state.viewReportIndex - 1]
        return (<div style={styles.root}>
            { this.state.viewReportIndex 
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
                    <ListItemText primary="Index" />
                    <ListItemText primary="Date" />
                    <ListItemText primary="Prediction in %" />
                
                </ListItem>
                {this.state.history.map((item, index) => {
                    return(
                        <ListItem key={index}>
                            <ListItemText primary={(index + 1).toString()} />
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
            }
        </div>)
    }
}

export default History