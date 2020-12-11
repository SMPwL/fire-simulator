import React from "react";
import styled from "styled-components";
import {Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {WiThermometer, WiHumidity, WiStrongWind, WiSmallCraftAdvisory} from "react-icons/wi";
import {BiLoaderAlt} from "react-icons/bi";
import {RiCelsiusLine} from "react-icons/ri";

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" style={{fontSize: '1.5rem'}}>
        {props}
    </Tooltip>
);


class General extends React.Component {

    getWindDirection = (degree) => {
        let direction;
        if (degree === 0) {
            direction = 'N';
        } else if (degree === 90) {
            direction = 'E';
        } else if (degree === 180) {
            direction = 'S';
        } else if (degree === 270) {
            direction = 'W';
        } else if (degree => 0 && degree <= 90) {
            direction = 'NE';
        } else if (degree => 90 && degree <= 180) {
            direction = 'SE';
        } else if (degree => 180 && degree <= 270) {
            direction = 'SW';
        } else {
            direction = 'NW';
        }
        return direction;
    }

    render() {
        const {name, temperature, humidity, windSpeed, windDeg} = this.props.weatherData;

        return (
            <Wrapper>
                <div>
                    <Heading>{name}</Heading>
                </div>
                <Container fluid>
                    {this.props.weatherData.temperature === '' &&
                    <strong><Loader/> Wczytywanie danych z
                        serwera...</strong>}
                    {this.props.weatherData.temperature !== '' &&
                    // <>
                    //     <p>Temperatura - <strong>{temperature}'C</strong></p>
                    //     <p>Wilgotność - <strong>{humidity}%</strong></p>
                    //     <p>Prędkość wiatru - <strong>{windSpeed} km/h</strong></p>
                    //     <p>Kierunek wiatru - <strong>{this.getWindDirection(windDeg)}</strong></p>
                    //     <p>CO2 - <strong>w normie</strong></p>
                    // </>
                    <Container fluid>
                        <Row style={{marginBottom: 0}}>
                            <Col md={4}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Temperatura')}
                                >
                                    <p><WiThermometer size={'2rem'}/> <strong>{temperature} <RiCelsiusLine/></strong></p>
                                </OverlayTrigger>
                            </Col>
                            <Col md={4}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Wilgotność')}
                                >
                                    <p><WiHumidity size={'2.5rem'}/> <strong>{humidity}%</strong></p>
                                </OverlayTrigger>
                            </Col>
                            <Col md={4}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Prędkość wiatru')}
                                >
                                    <p><WiStrongWind size={'2.5rem'}/> <strong>{windSpeed} km/h</strong></p>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Kierunek wiatru')}
                                >
                                    <p><WiSmallCraftAdvisory size={'2.5rem'}/>
                                        <strong>{this.getWindDirection(windDeg)}</strong></p>
                                </OverlayTrigger>
                            </Col>
                            <Col md={4}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Poziom CO2')}
                                >
                                    <p>CO<sub>2</sub> - <strong>w normie</strong></p>
                                </OverlayTrigger>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    }
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
   margin-bottom: 0;
`;

const Loader = styled(BiLoaderAlt)`
   margin-bottom: 4px;
   animation: rotation 1s infinite linear;
   @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
   }
`;

export default General;
