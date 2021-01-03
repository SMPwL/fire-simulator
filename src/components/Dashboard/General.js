import React from "react";
import styled from "styled-components";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
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

    sendWeather = (event) => {
        event.preventDefault();
        const temperature = event.target[0].value;
        const humidity = event.target[1].value;
        const windSpeed = event.target[2].value;
        const windDeg = event.target[3].value;

        for(let i = 0; i < 3; i++){
            event.target[i].placeholder=event.target[i].value;
            event.target[i].value="";
        }



        fetch('https://smpwl-server.herokuapp.com/weather ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temperature: temperature,
                humidity: humidity,
                direction: windDeg,
                windSpeed: windSpeed,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        const {name, temperature, humidity, windSpeed, windDeg} = this.props.weatherData;
        const wind = this.getWindDirection(windDeg);

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
                    <Container fluid>
                        <Form onSubmit={this.sendWeather}>
                            <Row className={'text-left'}>
                                <Col md={6}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Temperatura')}
                                    >
                                        <p><WiThermometer size={'2.5rem'}/><strong><Form.Control
                                            className={'w-50 d-inline-block'} type="number" placeholder={temperature}
                                            required/>
                                            <RiCelsiusLine/></strong></p>
                                    </OverlayTrigger>
                                </Col>
                                <Col md={6}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Wilgotność')}
                                    >
                                        <p><WiHumidity size={'2.5rem'}/> <strong><Form.Control
                                            className={'w-50 d-inline-block'} type="number" placeholder={humidity}
                                            required/> %</strong></p>
                                    </OverlayTrigger>
                                </Col>
                                <Col md={6}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Prędkość wiatru')}
                                    >
                                        <p><WiStrongWind size={'2.5rem'}/> <strong><Form.Control
                                            className={'w-50 d-inline-block'} type="number" placeholder={windSpeed} min={0}
                                            required/> km/h</strong></p>
                                    </OverlayTrigger>
                                </Col>
                                <Col md={6}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Kierunek wiatru')}
                                    >
                                        <p><WiSmallCraftAdvisory size={'2.5rem'}/>
                                            <Form.Control as="select" className={'w-50 d-inline-block'} required>
                                                <option selected={wind === 'N' && 'selected'}>N</option>
                                                <option selected={wind === 'NE' && 'selected'}>NE</option>
                                                <option selected={wind === 'E' && 'selected'}>E</option>
                                                <option selected={wind === 'SE' && 'selected'}>SE</option>
                                                <option selected={wind === 'S' && 'selected'}>S</option>
                                                <option selected={wind === 'SW' && 'selected'}>SW</option>
                                                <option selected={wind === 'W' && 'selected'}>W</option>
                                                <option selected={wind === 'NW' && 'selected'}>NW</option>
                                            </Form.Control></p>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            <Button variant="success" size={'lg'} className={"w-50"} type={'submit'}>Zatwierdź</Button>
                        </Form>
                    </Container>
                    }
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  height: 30%;
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
