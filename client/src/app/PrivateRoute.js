import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import auth from './auth/auth-helper'
import PhysiologyHome from './components/physiology/PhysiologyHome'
import RadiologyHome from './components/radiology/RadiologyHome'
import LabHome from './components/lab/LabHome'

//if user not signed in, redirect to /signin
//if path is / get department of user and redirect to specific route
//if another path, check authentication and render the specified component
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
            
            (Component != null ) ?  (
                <Component {...props}/>
            ) : (auth.getDepartment() === 'radiology' ) ? (
                    <RadiologyHome {...props} />
                ) : (auth.getDepartment() === 'physiology') ? (
                    <PhysiologyHome {...props} />
                ) : (
                    <LabHome {...props} />
                )
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: {from: props.location}
            }}/>
        )
    )}/>
)

export default PrivateRoute