import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import RadiologyHome from './RadiologyHome'
import Assessment from './Assessment'

class RadiologyRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={RadiologyHome} />
                <Route exact path="/patient/assessment" component={Assessment} />
            </Switch>
        )
    }
}

export default RadiologyRouter