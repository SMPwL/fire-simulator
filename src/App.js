import React from 'react';
import {BrowserRouter} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {routes} from "./routes/Routes";
import DashboardView from "./views/DashboardView";
import Nav from "./components/Nav";
import GlobalStyle from "./theme/Theme";
import Footer from "./components/Footer";
import styled from "styled-components";
import MapView from "./views/MapView";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <GlobalStyle />
                <Wrapper>
                    <Nav />
                    <Switch>
                        <Route exact path={routes.dashboard} component={DashboardView} />
                        <Route exact path={routes.map} component={MapView} />
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
