import React from "react";
import {Route, Redirect} from 'react-router-dom'
import {routes} from "./Routes";

class AuthRoute extends React.Component {
    render() {
        if(true) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to={routes.login} />
        }
    }
}

export default AuthRoute;