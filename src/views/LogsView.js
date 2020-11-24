import React from "react";
import styled from "styled-components";
import Alerts from "../components/Dashboard/Alerts";
import LastActivity from "../components/Dashboard/LastActivity";

class LogsView extends React.Component {
    render() {
        return (
            <Wrapper>
                <Alerts />
                <LastActivity />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin: 1rem 0;
  height: 87vh;
`;

export default LogsView;