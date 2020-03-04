import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Menu from './Menu'
import PrivateRoute from './PrivateRoute'

import Random from './random'

class MainRouter extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Switch>
                    <PrivateRoute exact path="/" />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                    <PrivateRoute exact path="/random" component={Random} />

                </Switch>
            </div>
        )
    }
}

export default MainRouter