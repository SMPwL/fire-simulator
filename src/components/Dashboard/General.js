import React from "react";
import styled from "styled-components";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {WiThermometer, WiHumidity, WiStrongWind, WiSmallCraftAdvisory} from "react-icons/wi";
import {BiLoaderAlt} from "react-icons/bi";
import {RiCelsiusLine} from "react-icons/ri";
import {FiCloudRain} from "react-icons/fi";

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
        const rain = event.target[4].value;

        for (let i = 0; i < event.target.length; i++) {
            if (i !== 3) {
                event.target[i].placeholder = event.target[i].value;
                event.target[i].value = "";
            }
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
                rain: rain,
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
        const {name, temperature, humidity, windSpeed, windDeg, rain} = this.props.weatherData;
        const wind = this.getWindDirection(windDeg);

        return (
            <Wrapper>
                <div>
                    <Heading>{name}</Heading>
                </div>
                <Container>
                    {this.props.weatherData.temperature === '' &&
                    <strong><Loader/> Wczytywanie danych z
                        serwera...</strong>}
                    {this.props.weatherData.temperature !== '' &&
                    <Form onSubmit={this.sendWeather}>
                        <Row className={'text-left'}>
                            <Col sm={{span: 5, offset: 1}}>
                                <WiThermometer size={'18px'} className={'d-inline-block mr-3'}/>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Temperatura')}
                                >
                                                <span>
                                                    <Form.Control
                                                        style={{width: '100px'}}
                                                        className={'d-inline-block'} type="number"
                                                        placeholder={temperature}
                                                        required/>
                                                <span> </span>
                                                <RiCelsiusLine className={'d-inline-block'}/>
                                                </span>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={{span: 5, offset: 1}}>
                                <WiHumidity size={'18px'} className={'d-inline-block  mr-3'}/>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Wilgotność')}
                                >
                                                <span>
                                                    <Form.Control
                                                        style={{width: '100px'}}
                                                        className={'d-inline-block'}
                                                        type="number"
                                                        placeholder={humidity}
                                                        required/> %
                                                </span>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={{span: 5, offset: 1}}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Prędkość wiatru')}
                                >
                                    <>
                                        <WiStrongWind size={'18px'} className={'d-inline-block  mr-3'}/>
                                        <Form.Control
                                            style={{width: '100px'}}
                                            className={'d-inline-block'} type="number" placeholder={windSpeed}
                                            min={0}
                                            required/><span style={{fontSize: '13px'}}>km/h</span>
                                    </>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={{span: 5, offset: 1}}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Kierunek wiatru')}
                                >
                                    <>
                                        <WiSmallCraftAdvisory size={'18px'} className={'d-inline-block  mr-3'}/>
                                        <Form.Control as="select"
                                                      style={{width: '100px'}}
                                                      className={' d-inline-block'}
                                                      required>
                                            <option selected={wind === 'N' && 'selected'}>N</option>
                                            <option selected={wind === 'NE' && 'selected'}>NE</option>
                                            <option selected={wind === 'E' && 'selected'}>E</option>
                                            <option selected={wind === 'SE' && 'selected'}>SE</option>
                                            <option selected={wind === 'S' && 'selected'}>S</option>
                                            <option selected={wind === 'SW' && 'selected'}>SW</option>
                                            <option selected={wind === 'W' && 'selected'}>W</option>
                                            <option selected={wind === 'NW' && 'selected'}>NW</option>
                                        </Form.Control>
                                    </>
                                </OverlayTrigger>
                            </Col>
                            <Col sm={{span: 5, offset: 1}}>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 150, hide: 250}}
                                    overlay={renderTooltip('Opady deszczu')}
                                >
                                    <>
                                        <FiCloudRain size={'18px'} className={'d-inline-block  mr-3'}/>
                                        <Form.Control
                                            style={{width: '100px'}}
                                            className={'d-inline-block'} type="number" placeholder={rain} min={0}
                                            max={10}
                                            required/><span style={{fontSize: '13px'}}>mm/h</span>
                                    </>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Button variant="success" size={'lg'} className={"w-50 mt-1"} type={'submit'}>Zatwierdź</Button>
                    </Form>
                    }
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
                    height: 31%;
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
