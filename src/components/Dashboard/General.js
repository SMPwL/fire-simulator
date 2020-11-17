import React from "react";
import styled from "styled-components";

class General extends React.Component {
    render() {
        return (
            <Wrapper>
                <div>
                    <Heading>Informacje ogólne</Heading>
                    <p>Kroszówka</p>
                </div>
                <div>
                    <p>Temperatura: 32'C</p>
                    <p>Wilgotność: 15%</p>
                    <p>CO2: w normie</p>
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

export default General;