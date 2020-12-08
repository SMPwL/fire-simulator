import React from "react";
import styled from "styled-components";

class General extends React.Component {

    getWindDirection = (degree) => {
        let direction;
        if(degree === 0) {
            direction = 'N';
        } else if (degree === 90) {
            direction = 'E';
        } else if (degree === 180) {
            direction = 'S';
        } else if (degree === 270) {
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
        const { name, temperature, humidity, windSpeed, windDeg } = this.props.weatherData;

        return (
            <Wrapper>
                <div>
                    <Heading>{name}</Heading>
                </div>
                <div>
                    {this.props.weatherData.temperature === '' && <strong>Wczytywanie danych z serwera...</strong>}
                    {this.props.weatherData.temperature !== '' &&
                        <>
                            <p>Temperatura - <strong>{temperature}'C</strong></p>
                            <p>Wilgotność - <strong>{humidity}%</strong></p>
                            <p>Prędkość wiatru - <strong>{windSpeed} km/h</strong></p>
                            <p>Kierunek wiatru - <strong>{this.getWindDirection(windDeg)}</strong></p>
                            <p>CO2 - <strong>w normie</strong></p>
                        </>
                    }
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