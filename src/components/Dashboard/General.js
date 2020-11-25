import React from "react";
import styled from "styled-components";

class General extends React.Component {

    state = {
        name: '',
        temp: '',
        humidity: '',
        windDirection: '',
        windSpeed: ''
    }

    componentDidMount() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=krosz%C3%B3wka&appid=234c8686150141d829255637d1ac0d46&units=metric`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    name: data.name,
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    windDirection: this.setWindDirection(data.wind.deg),
                    windSpeed: data.wind.speed
                });
            })
    }

    setWindDirection = (degree) => {
        let direction;
        if(degree == 0) {
            direction = 'N';
        } else if (degree == 90) {
            direction = 'E';
        } else if (degree == 180) {
            direction = 'S';
        } else if (degree == 270) {
            direction = 'W';
        } else if (degree => 0 && degree <= 90) {
            direction = 'NE';
        } else if(degree => 90 && degree <= 180) {
            direction = 'SE';
        } else if(degree => 180 && degree <= 270) {
            direction = 'SW';
        } else {
            direction = 'NW';
        }
        return direction;
    }

    render() {
        return (
            <Wrapper>
                <div>
                    <Heading>{this.state.name}</Heading>
                </div>
                <div>
                    <p>Temperatura - <strong>{this.state.temp}'C</strong></p>
                    <p>Wilgotność - <strong>{this.state.humidity}%</strong></p>
                    <p>Prędkość wiatru - <strong>{this.state.windSpeed} km/h</strong></p>
                    <p>Kierunek wiatru - <strong>{this.state.windDirection}</strong></p>
                    <p>CO2 - <strong>w normie</strong></p>
                </div>
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
  margin-bottom: 2rem;
`;

export default General;