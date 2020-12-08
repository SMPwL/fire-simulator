import React from "react";
import styled from "styled-components";
import Map from "../components/Map";
import General from "../components/Dashboard/General";
import Alerts from "../components/Dashboard/Alerts";
import LastActivity from "../components/Dashboard/LastActivity";

class DashboardView extends React.Component {

    state = {
        SSE: null,
        detectorsData: [],
        agentCommunication: [],
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
                agentCommunication: data.agentCommunication,
                weatherData: {
                    ...this.state.weatherData,
                    temperature: data.weatherData.temperature,
                    humidity: data.weatherData.humidity,
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
            <Wrapper>
                <Row1>
                    <Map detectorsData={this.state.detectorsData} />
                </Row1>
                <Row3>
                    <General weatherData={this.state.weatherData} />
                    <Alerts alertMessage={this.state.weatherData.alertMessage} />
                    <LastActivity agentCommunication={this.state.agentCommunication} />
                </Row3>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;
`;

const Row1 = styled.div`

`;

const Row3 = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 1fr 1fr;
  div {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default DashboardView;