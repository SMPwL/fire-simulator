import React from "react";
import styled from "styled-components";

class Alerts extends React.Component {
    render() {
        return (
            <Wrapper>
                <div>
                    <Heading>Komunikaty</Heading>
                    <p>Brak komunikatów!</p>
                </div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  color: black;
  background: #d0d0d04a;
  text-align: center;
  padding: 1rem;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
`;

const Container = styled.div`
  height: 20vh;
  overflow: auto;
  overflow-x: hidden;
`;

export default Alerts;