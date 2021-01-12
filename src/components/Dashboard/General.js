import React from "react";
import styled from "styled-components";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip, Modal} from "react-bootstrap";
import {WiThermometer, WiHumidity, WiStrongWind, WiSmallCraftAdvisory} from "react-icons/wi";
import {BiLoaderAlt} from "react-icons/bi";
import {RiCelsiusLine} from "react-icons/ri";
import {FiCloudRain} from "react-icons/fi";
import {AiOutlineEdit} from "react-icons/ai";

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" style={{fontSize: '1.5rem'}}>
        {props}
    </Tooltip>
);


class General extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false
        }
    }

    modalToggle = () => {
        this.setState({modal: !this.state.modal})
    }

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


        fetch('https://smpwl-server.herokuapp.com/weather', {
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

        this.modalToggle()
    }

    render() {
        const {name, temperature, humidity, windSpeed, windDeg, rain} = this.props.weatherData;
        const wind = this.getWindDirection(windDeg);

        return (
            <Wrapper>
                <Modal show={this.state.modal}>
                    <Form onSubmit={this.sendWeather}>
                        <Modal.Header>
                            <Modal.Title>Edytuj warunki pogodowe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className={'text-left'}>
                                <Col sm={{span: 5, offset: 1}}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Temperatura')}
                                    >
                                         <span>
                                             <WiThermometer size={'22px'} className={'d-inline-block mr-3'}/>
                                         </span>
                                    </OverlayTrigger>
                                    <Form.Control
                                        size="lg"
                                        style={{width: '100px'}}
                                        className={'d-inline-block m-1'} type="number"
                                        placeholder={temperature}
                                        required/>
                                    <span> </span>
                                    <RiCelsiusLine className={'d-inline-block'}/>
                                </Col>
                                <Col sm={{span: 5, offset: 1}}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Wilgotność')}
                                    >
                                                     <span>
                                                         <WiHumidity size={'22px'} className={'d-inline-block  mr-3'}/>
                                                     </span>
                                    </OverlayTrigger>
                                    <Form.Control
                                        size="lg"
                                        style={{width: '100px'}}
                                        className={'d-inline-block m-1'}
                                        type="number"
                                        placeholder={humidity}
                                        required/> %
                                </Col>
                                <Col sm={{span: 5, offset: 1}}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Prędkość wiatru')}
                                    >
                                        <span>
                                            <WiStrongWind size={'22px'} className={'d-inline-block  mr-3'}/>
                                        </span>
                                    </OverlayTrigger>
                                    <Form.Control
                                        size="lg"
                                        style={{width: '100px'}}
                                        className={'d-inline-block m-1'} type="number" placeholder={windSpeed}
                                        min={0}
                                        required/><span style={{fontSize: '15px'}}>km/h</span>
                                </Col>
                                <Col sm={{span: 5, offset: 1}}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Kierunek wiatru')}
                                    >
                                        <span>
                                            <WiSmallCraftAdvisory size={'22px'} className={'d-inline-block  mr-3'}/>
                                        </span>
                                    </OverlayTrigger>
                                    <Form.Control as="select" size="lg"
                                                  style={{width: '100px'}}
                                                  className={'d-inline-block m-1'}
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
                                </Col>
                                <Col sm={{span: 5, offset: 1}}>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 250}}
                                        overlay={renderTooltip('Opady deszczu')}
                                    >
                                        <span>
                                            <FiCloudRain size={'22px'} className={'d-inline-block  mr-3'}/>
                                        </span>
                                    </OverlayTrigger>
                                    <Form.Control
                                        size="lg"
                                        style={{width: '100px'}}
                                        className={'d-inline-block m-1'} type="number" placeholder={rain}
                                        min={0}
                                        max={10}
                                        required/><span style={{fontSize: '15px'}}>mm/h</span>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" size={'lg'} type={'submit'}>Zatwierdź</Button>
                            <Button variant="secondary" size={'lg'} onClick={this.modalToggle}>
                                Zamknij
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {this.props.weatherData.temperature !== '' &&
                <EditButton variant="success" size="lg" onClick={this.modalToggle}><AiOutlineEdit/> Edytuj</EditButton>
                }
                <div>
                    <Heading>{name}</Heading>
                </div>
                <Container>
                    {this.props.weatherData.temperature === '' &&
                    <strong><Loader/> Wczytywanie danych z
                        serwera...</strong>}
                    {this.props.weatherData.temperature !== '' &&
                    <Row className={'text-left'}>
                        <Col sm={{span: 4}}>
                            <WiThermometer size={'18px'} className={'d-inline-block mr-3'}/>
                            <OverlayTrigger
                                placement="top"
                                delay={{show: 150, hide: 250}}
                                overlay={renderTooltip('Temperatura')}
                            >
                                <span>
                                   {temperature} <RiCelsiusLine className={'d-inline-block'}/>
                                </span>
                            </OverlayTrigger>
                        </Col>
                        <Col sm={{span: 4}}>
                            <WiHumidity size={'18px'} className={'d-inline-block  mr-3'}/>
                            <OverlayTrigger
                                placement="top"
                                delay={{show: 150, hide: 250}}
                                overlay={renderTooltip('Wilgotność')}
                            >
                                                    <span>
                                                        {humidity} %
                                                    </span>
                            </OverlayTrigger>
                        </Col>
                        <Col sm={{span: 4}}>
                            <WiStrongWind size={'18px'} className={'d-inline-block  mr-3'}/>
                            <OverlayTrigger
                                placement="top"
                                delay={{show: 150, hide: 250}}
                                overlay={renderTooltip('Prędkość wiatru')}
                            >
                                                    <span>
                                                        {windSpeed} <span style={{fontSize: '13px'}}>km/h</span>
                                                    </span>
                            </OverlayTrigger>
                        </Col>
                        <Col sm={{span: 4}}>
                            <WiSmallCraftAdvisory size={'18px'} className={'d-inline-block  mr-3'}/>
                            <OverlayTrigger
                                placement="top"
                                delay={{show: 150, hide: 250}}
                                overlay={renderTooltip('Kierunek wiatru')}
                            >
                                <span>
                                    {wind}
                                </span>
                            </OverlayTrigger>
                        </Col>
                        <Col sm={{span: 4}}>
                            <FiCloudRain size={'18px'} className={'d-inline-block  mr-3'}/>
                            <OverlayTrigger
                                placement="top"
                                delay={{show: 150, hide: 250}}
                                overlay={renderTooltip('Opady deszczu')}
                            >
                                <span>
                                    {rain}<span style={{fontSize: '13px'}}> mm/h</span>
                                </span>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    }
                </Container>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
                    height: 25%;
                    color: black;
                    background: #d0d0d04a;
                    text-align: center;
                    padding: 1rem;
                    display: grid;
                    justify-items: center;
                    align-items: center;
                    position: relative;
                    `;

const Heading = styled.h1`
                    margin-bottom: 0;
                    `;

const EditButton = styled(Button)`
                    z-index: 10;
                    position: absolute;
                    top: 15px;
                    right: 20px;
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
