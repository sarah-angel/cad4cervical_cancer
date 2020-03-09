import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, List, Button } from 'material-ui'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { getHistory } from '../../helpers/api-radiology'
import Report from './Report'

class History extends Component {
    state = {
        patient: this.props.patient,
        history: [],
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
        return (
            <Paper elevation={4}>
                { this.state.viewReportIndex 
                ? <Report patient={this.state.patient} 
                        report={this.state.history[this.state.viewReportIndex - 1]}
                        close={() => this.setState({viewReportIndex: null})}/>

                :<List>
                    <ListItem>
                        <ListItemText primary="Index" />
                        <ListItemText primary="Date" />
                        <ListItemText primary="Prediction in %" />
                    
                    </ListItem>
                    {this.state.history.map((item, index) => {
                        return(<Link key={index}>
                            <ListItem>
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
                            </Link>
                        )
                    })}
                </List>
                }
            </Paper>
        )
    }
}

export default History