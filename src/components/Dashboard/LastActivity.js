import React from "react";
import styled from "styled-components";

class LastActivity extends React.Component {

    render() {
        return (
            <Wrapper>
                <Heading>Aktywność agentów</Heading>
                <Container>
                    {this.props.filteredCommunication.length === 0 && <p>Brak aktywności!</p>}
                    {this.props.filteredCommunication.map(({message, date, agentId, type}, number) => (
                        <Box key={number}>
                            <TitleWrapper>
                                <div><AgentHeading><AlertIcon  type={type}/>{type} {agentId}</AgentHeading></div>
                                <div><DateParagraph>{date.substr(0, 19).replace(/T/g, ' ')}</DateParagraph></div>
                            </TitleWrapper>
                            <p style={{fontSize: '14px', textAlign: "justify"}}>{message}</p>
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
  // text-align: center;
  padding: 1rem;
  display: grid;
  justify-items: center;
  // align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 0rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0 !important;
`;

const AgentHeading = styled.h4`
  font-weight: 900;
`;

const DateParagraph = styled.p`
  font-size: 12px;
`;

const Container = styled.div`
  margin-top: 35px;
  height: 80%;
  overflow: auto;
  overflow-x: hidden;
`;

const Box = styled.div`
  padding: 0 15px;

  :last-child hr {
    display: none;
  }
`;

const AlertIcon = styled.div`
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background-color: ${props => props.type == 'Straż pożarna' ? "#009EFA" : props.type == 'Czujnik' ? "#FF8066" : "#00AF54"};
    display: inline-block;
    margin-right: 5px;
    `

export default LastActivity;
