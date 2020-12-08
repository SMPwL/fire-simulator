import React from 'react'
import {
    Map,
    Polygon,
    TileLayer,
    Circle
} from 'react-leaflet';
import styled from "styled-components";
import 'leaflet/dist/leaflet.css';
import {mapAsset} from "../assets/map";
import Legend from './Legend'
import polygonIds from "../assets/polygonIds";

class MapComponent extends React.Component {

    state = {
        SSE: null,
        sensors: generateColors(16, 13),
        polygons: [],
        polygonIds: []
    };

    handleClick = (number) => {
        let colors = this.state.sensors;

        if(colors[200] !== '#FFFFFF') {
            fetch(`https://smpwl-server.herokuapp.com/setfire`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: number
                })
            });

            alert(`Sektor ${number} został podpalony`);

            colors[number] = 'red'
            this.setState(() => ({
                sensors: colors,
            }));

            console.log('Color id: ' + number + ' updated!')
        }
    }

    componentDidMount() {
        const SSE = new EventSource(`https://smpwl-server.herokuapp.com/SSE`);

        SSE.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.updateSensors(data.detectorsData);
        };

        this.setState({
            polygons: mapAsset(),
            polygonIds,
            SSE
        });
    }

    componentWillUnmount() {
        const { SSE } = this.state;
        if(SSE && SSE.readyState === 1){
            SSE.close();
        }
    }

    updateSensors = (data) => {
        let { sensors } = this.state;

        data.map(({id, co2level}) => {
            return sensors[id] = getColor(co2level * 10)
        })

        this.setState({
            ...this.state,
            sensors
        })
    }

    render() {
        const center = [53.737153, 22.840776]
        return (
            <Wrapper>
                <Legend/>
                <Map center={center} zoom={15} style={{width: '100%', height: '87vh'}}
                     dragging={false}
                     zoomControl={false} doubleClickZoom={false}
                     scrollWheelZoom={false}
                     attributionControl={false}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle center={{lat: "53.73740629082238", lng: "22.83537588283777"}} fillColor="blue" radius={320} />

                    {this.state.polygons.map((item, number) => (
                        <Polygon key={number} color={this.state.sensors[this.state.polygonIds[number]]} positions={item}
                                 onClick={() => this.handleClick(this.state.polygonIds[number])}/>
                    ))}
                </Map>
            </Wrapper>
        )
    }
}


function generateColors(x, y) {
    const polygon = [];

    for (let n = 0; n < x; n++) {
        for(let m = 0; m < y; m++) {
            //polygon.push(getColor([Math.floor(Math.random() * 1001)]))
            polygon.push('#FFFFFF');
        }
    }

    return polygon;
}

function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 960 ? '#BD0026' :
            d > 900 ? '#E31A1C' :
                d > 800 ? '#FC4E2A' :
                    d > 500 ? '#FD8D3C' :
                        d > 400 ? '#FEB24C' :
                            d > 300 ? '#FED976' :
                                '#FFEDA0';
}

const Wrapper = styled.div`
  
`;

export default MapComponent;
