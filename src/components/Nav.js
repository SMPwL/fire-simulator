import React from "react";
import styled from "styled-components";
import {routes} from "../routes/Routes";
import {Button} from "react-bootstrap";
import {IoReloadSharp} from "react-icons/io5";

class Nav extends React.Component {

    handleRestart = () =>{
        fetch(`https://smpwl-server.herokuapp.com/reset`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then();
    }

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
                </List>
                <List>
                    <Button variant="danger" size={'lg'} style={{margin: '7px 10px'}} onClick={this.handleRestart}><IoReloadSharp/> Restart</Button>
                </List>
            </Wrapper>
        )
    }
}



const Wrapper = styled.div`
  color: #eee;
  background: #24292e;
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
  padding: 1.5rem 1rem;
  &:last-child {
    margin-right: 0;
  }
`;

const Link = styled.a`
  color: #eee;
  text-decoration: none;
  padding: 1.5rem 1rem;
  &:hover {
    color: #eee;
    background-color: #111;
    text-decoration: none;
  }
`;

export default Nav;
