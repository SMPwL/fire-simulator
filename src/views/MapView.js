import React from "react";
import styled from "styled-components";
import Map from "../components/Map";

class MapView extends React.Component {
    render() {
        return (
            <Wrapper>
                <Map />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  margin: 1rem 0;
`;

export default MapView;