import React from "react";
import styled from "styled-components";
import Map from "../components/Map";
import General from "../components/Dashboard/General";
import Alerts from "../components/Dashboard/Alerts";
import LastActivity from "../components/Dashboard/LastActivity";
import {Col, Container, Row} from "react-bootstrap";

class DashboardView extends React.Component {

    state = {
        SSE: null,
        detectorsData: [],
        filteredCommunication: [],
        weatherData: {
            alertMessage: [],
            temperature: "",
            humidity: "",
            name: "",
            windSpeed: ""
        }
    }

    componentDidMount() {
        const SSE = new EventSource(`https://smpwl-server.herokuapp.com/SSE`);

        SSE.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.setState({
                detectorsData: data.detectorsData,
                filteredCommunication: data.filteredCommunication,
                weatherData: {
                    ...this.state.weatherData,
                    temperature: data.weatherData.temperature,
                    humidity: data.weatherData.humidity,
                    // windDeg: data.weatherData.windDeg,
                    // windSpeed: data.weatherData.windSpeed,
                    alertMessage: data.weatherData.hasOwnProperty('alertMessage') ? [ data.weatherData.alertMessage ] : []
                }
            })
        };

        this.setState({
            SSE
        });

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=krosz%C3%B3wka&appid=234c8686150141d829255637d1ac0d46&units=metric`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    weatherData: {
                        ...this.state.weatherData,
                        name: data.name,
                        windDeg: data.wind.deg,
                        windSpeed: data.wind.speed
                    }
                });
            })

    }

    componentWillUnmount() {
        const { SSE } = this.state;
        if(SSE && SSE.readyState === 1){
            SSE.close();
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={"8"}>
                        <div>
                            <Map detectorsData={this.state.detectorsData} />
                        </div>
                    </Col>
                    <Col md={"4"}>
                        <Dashboard style={{height: '80vh'}}>
                            <General weatherData={this.state.weatherData} />
                            <Alerts alertMessage={this.state.weatherData.alertMessage.reverse()} />
                            <LastActivity filteredCommunication={this.state.filteredCommunication.reverse()}/>
                        </Dashboard>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const Dashboard = styled.div`
  div {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default DashboardView;
