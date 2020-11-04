import React from 'react';
import {BrowserRouter} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {routes} from "./routes/Routes";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
import AuthRoute from "./routes/AuthRoute";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={routes.login} component={LoginView}/>
                    <AuthRoute path={routes.dashboard} component={DashboardView}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
