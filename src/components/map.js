import React from 'react'
import {
    Map,
    Polygon,
    TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import {mapAsset} from "../assets/map";
import Legend from './legend'

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: generateColors(16, 15),
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(number) {
        let colors = this.state.color;
        colors[number] = 'blue'
        this.setState(state => ({
            color: colors,
        }));

        console.log('Color id: ' + number + ' updated!')
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
        this.setState({
            polygons: mapAsset()
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
                    {console.log(this.state.polygons)}
                    {this.state.polygons.map((item, number) => (
                        <>
                            <Polygon color={this.state.color[number]} positions={item}
                                     onClick={(e) => this.handleClick(number)}/>
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

    for (let n = 0; n < x * y; n++) {
        polygon.push(getColor([Math.floor(Math.random() * 1001)]))
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


export default MapComponent;
