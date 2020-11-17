import React from 'react';
import {BrowserRouter} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {routes} from "./routes/Routes";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
import AuthRoute from "./routes/AuthRoute";
import Nav from "./components/Nav";
import GlobalStyle from "./theme/Theme";
import Footer from "./components/Footer";
import styled from "styled-components";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <GlobalStyle />
                <Wrapper>
                    <Nav />
                    <Switch>
                        <Route exact path={routes.login} component={LoginView}/>
                        <AuthRoute path={routes.dashboard} component={DashboardView}/>
                    </Switch>
                </Wrapper>
                <Footer />
            </BrowserRouter>
        );
    }
}

const Wrapper = styled.div`
  min-height: calc(100vh - 5rem);
`;

export default App;
