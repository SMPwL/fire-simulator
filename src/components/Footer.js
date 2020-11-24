import React from "react";
import styled from "styled-components";

class Footer extends React.Component {
    render() {
        return (
            <Wrapper>
                <Text>System monitorowania pożarów w lesie</Text>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  color: #eee;
  background: #24292e;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
`;

const Text = styled.p`
  text-align: center;
`;

export default Footer;