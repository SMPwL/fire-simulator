import React from "react";
import styled from "styled-components";

class Alerts extends React.Component {
    render() {
        return (
            <Wrapper>
                <div>
                    <Heading>Komunikaty</Heading>
                    <p>Wspaniale!</p>
                    <p>Nie ma teraz żadnego pożaru.</p>
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

export default Alerts;