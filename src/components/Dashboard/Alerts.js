import React from "react";
import styled from "styled-components";

class Alerts extends React.Component {

    render() {
        return (
            <Wrapper>
                <Heading>Komunikaty</Heading>
                <Container>
                    {this.props.alertMessage.length === 0 && <p>Brak komunikatów!</p> }
                    {this.props.alertMessage.map((alertMessage, number) => (
                        <Box key={number}>
                            <AgentHeading>Uwaga!</AgentHeading>
                            <p><AlertIcon level={alertMessage}/>{alertMessage}</p>
                            <DateParagraph>{new Date().toISOString().substr(0, 19).replace(/T/g, ' ')}</DateParagraph>
                            <hr/>
                        </Box>
                    ))}
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  height: 25%;
  color: black;
  background: #d0d0d04a;
  text-align: center;
  padding: 1rem;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 0;
`;

const AgentHeading = styled.h4`
  font-weight: 900;
`;

const Container = styled.div`
  overflow: auto;
  overflow-x: hidden;
`;

const DateParagraph = styled.p`
  font-size: 12px;
`;

const Box = styled.div`
  :last-child hr {
    display: none;
  }
`;

const AlertIcon = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 15px;
    background-color: ${props => props.level == 'Niskie zagrożenie pożarowe' ? "orange" : "red"};
    display: inline-block;
    margin-right: 5px;
    `

export default Alerts;
