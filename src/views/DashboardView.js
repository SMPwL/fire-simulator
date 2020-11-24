import React from "react";
import styled from "styled-components";
import Map from "../components/Map";
import General from "../components/Dashboard/General";
import Alerts from "../components/Dashboard/Alerts";
import LastActivity from "../components/Dashboard/LastActivity";

class DashboardView extends React.Component {
    render() {
        return (
            <Wrapper>
                <Row1>
                    <Map />
                </Row1>
                <Row3>
                    <General />
                    <Alerts />
                    <LastActivity />
                </Row3>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;
`;

const Row1 = styled.div`

`;

const Row3 = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  div {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default DashboardView;