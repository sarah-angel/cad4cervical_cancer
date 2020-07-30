import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Menu from './Menu'
import PrivateRoute from './PrivateRoute'

class MainRouter extends Component {

    state = {
        mobileOpen: false,
    }

    handleDrawerToggle = () => {
        this.setState(prevState => (
            {mobileOpen: !prevState.mobileOpen})
        )
    }

    render() {
        return (
            <div>
                <Menu handleDrawerToggle={this.handleDrawerToggle} />
                <Switch >
                    <PrivateRoute exact path="/" 
                        mobileOpen={this.state.mobileOpen} 
                        handleDrawerToggle={this.handleDrawerToggle} 
                    />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </div>
        )
    }
}

export default MainRouter