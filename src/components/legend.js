import React from "react";
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`;

const LegendBox = styled.div`
  position: absolute;
  z-index: 1000;
  top: 10px;
  right: 10px;
  width: 150px;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.2);
  background-color: white;
  padding-bottom: 15px;
`
const LegendItem = styled.div`
  padding: 5px 10px;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  span{
    padding: 0 0 0 10px;
  }
  &:hover{
    background-color: rgba(0,0,0,0.1);
    transition: background-color 0.2s;
  }
`

const ColorLegendItem = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color ? props.color : "white"}
`

class Legend extends React.Component {
    render() {
        const legend = [
            {
                color: '#800026',
                name: '100%'
            },
            {
                color: '#BD0026',
                name: '90%'
            },
            {
                color: '#E31A1C',
                name: '75%'
            },
            {
                color: '#FC4E2A',
                name: '60%'
            },
            {
                color: '#FD8D3C',
                name: '45%'
            },
            {
                color: '#FEB24C',
                name: '30%'
            },
            {
                color: '#FED976',
                name: '15%'
            },
            {
                color: '#FFEDA0',
                name: '0%'
            },
        ]

        return (
            <Wrapper>
                <LegendBox>
                    <h5 className={'text-center mt-1'}>Legenda</h5>
                    {legend.map((item) => (
                            <LegendItem>
                                <ColorLegendItem color={item.color}/>
                                <span>{item.name}</span>
                            </LegendItem>
                        )
                    )
                    }

                </LegendBox>
            </Wrapper>

        );
    }
}

export default Legend
