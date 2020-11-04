import React from 'react'
import {
    Map,
    Polygon,
    TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import {mapAsset} from "../assets/map";
import Legend from './legend'
import polygonIds from "../assets/polygonIds";
import { withRouter } from 'react-router-dom';

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: generateColors(16, 13),
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(number) {
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
        // let number = 0;
        // const interval = setInterval(() => {
        //     let colors = this.state.color;
        //     colors[number] = 'blue'
        //     this.setState(state => ({
        //         color: colors
        //     }));
        //     number++
        // }, 100);
        // return () => clearInterval(interval);
    }

    componentWillMount() {
        const SSE = new EventSource(`https://smpwl-server.herokuapp.com/SSE`);

        SSE.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.updateSensors(data);
        };

        this.setState({
            polygons: mapAsset(),
            polygonIds,
            SSE
        });
    }

    updateSensors = (data) => {
        let { sensors } = this.state;

        data.map(({id, co2level}) => {
            sensors[id] = getColor(co2level * 10)
        })

        this.setState({
            ...this.state,
            sensors
        })
    }

    render() {
        const center = [53.737153, 22.840776]
        return (
            <>
                <Legend/>
                <Map center={center} zoom={15} style={{width: '100%', height: '100vh'}}
                     dragging={false}
                     zoomControl={false} doubleClickZoom={false}
                     scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.polygons.map((item, number) => (
                        <>
                            <Polygon color={this.state.sensors[this.state.polygonIds[number]]} positions={item}
                                     onClick={() => this.handleClick(this.state.polygonIds[number])}/>
                        </>
                    ))
                    }
                </Map>
            </>
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


export default withRouter(MapComponent);
