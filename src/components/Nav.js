import React from "react";
import styled from "styled-components";

class Nav extends React.Component {
    render() {
        return (
            <Wrapper>
                <List>
                    <Item>Cockpit</Item>
                    <Item>Mapa</Item>
                    <Item>Logi</Item>
                </List>
                <List>
                    <Item>Zalogowany jako Leśniczny</Item>
                </List>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  color: #eee;
  background: #24292e;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  margin-right: 1.5rem;
  &:last-child {
    margin-right: 0;
  }
`;

export default Nav;