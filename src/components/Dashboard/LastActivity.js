import React from "react";
import styled from "styled-components";

class LastActivity extends React.Component {

    render() {
        return (
            <Wrapper>
                <Heading>Aktywność agentów</Heading>
                <Container>
                    {this.props.filteredCommunication.length === 0 && <p>Brak aktywności!</p> }
                    {this.props.filteredCommunication.map(({message, date, agentId, type}, number) => (
                        <Box key={number}>
                            <AgentHeading>{type} {agentId}</AgentHeading>
                            <p style={{fontSize: '14px'}}>{message}</p>
                            <DateParagraph>{date.substr(0, 19).replace(/T/g, ' ')}</DateParagraph>
                            <hr/>
                        </Box>
                    ))}
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  height: 60%;
  color: black;
  background: #d0d0d04a;
  text-align: center;
  padding: 1rem;
  display: grid;
  justify-items: center;
  // align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 0rem;
`;

const AgentHeading = styled.h4`
  font-weight: 900;
`;

const Container = styled.div`
  margin-top: 35px;
  height: 80%;
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

export default LastActivity;
