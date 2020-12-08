import React from "react";
import styled from "styled-components";

class LastActivity extends React.Component {

    state = {
        SSE: null,
        agentCommunication: []
    }

    componentDidMount() {
        const SSE = new EventSource(`https://smpwl-server.herokuapp.com/SSE`);

        SSE.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.updateLastActivity(data.agentCommunication.reverse());
        };

        this.setState({
            SSE
        });
    }

    componentWillUnmount() {
        const { SSE } = this.state;
        if(SSE && SSE.readyState === 1){
            SSE.close();
        }
    }

    updateLastActivity = (agentCommunication) => {
        this.setState({
            ...this.state,
            agentCommunication
        })
    }

    render() {
        return (
            <Wrapper>
                <Heading>Aktywność agentów</Heading>
                <Container>
                    {this.state.agentCommunication.length === 0 && <p>Brak aktywności!</p> }
                    {this.state.agentCommunication.map(({message, date, agentId, type}, number) => (
                        <Box key={number}>
                            <AgentHeading>{type} {agentId}</AgentHeading>
                            <p>{message}</p>
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

const AgentHeading = styled.h4`
  font-weight: 900;
`;

const Container = styled.div`
  height: 20vh;
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