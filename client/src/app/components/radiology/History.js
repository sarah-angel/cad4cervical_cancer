import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, List, Button } from 'material-ui'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { getHistory } from '../../helpers/api-radiology'

class History extends Component {
    state = {
        patientId: this.props.patient,
        history: [],
        error: ''
    }

    componentDidMount() {
        getHistory(this.props.patient).then((data) => {
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
                <List>
                    <ListItem>
                        <ListItemText primary="Index" />
                        <ListItemText primary="Date" />
                        <ListItemText primary="Prediction in %" />
                    
                    </ListItem>
                    {this.state.history.map((item, index) => {
                        return(<Link key={index}>
                            <ListItem>
                                <ListItemText primary={index.toString()} />
                                <ListItemText primary={item.created} />
                                <ListItemText primary={item.prediction} />
                                <ListItemSecondaryAction>
                                    <Button color="primary">
                                        View Report
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </Paper>
        )
    }
}

export default History