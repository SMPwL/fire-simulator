import React from "react";
import styled from "styled-components";
import {routes} from "../routes/Routes";

class Nav extends React.Component {
    render() {
        return (
            <Wrapper>
                <List>
                    <Item>
                        <Link href={routes.dashboard}>Kokpit</Link>
                    </Item>
                    <Item>
                        <Link href={routes.map}>Mapa</Link>
                    </Item>
                    <Item>
                        <Link href={routes.logs}>Komunikaty</Link>
                    </Item>
                </List>
                <List>
                    <Item>SMPwK</Item>
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

const Link = styled.a`
  color: #eee;
  text-decoration: none;
  padding: 14px 16px;
  &:hover {
    color: #eee;
    background-color: #111;
    text-decoration: none;
  }
`;

export default Nav;