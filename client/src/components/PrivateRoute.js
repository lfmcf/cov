import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import cookies from './assests/helpers/cookies';

const checkAuth = () => {
    const token = cookies.get('token')
    if(!token) {
        return false
    }
    return true
} 

const PrivateRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={(props) => (
        checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)


export default PrivateRoute;