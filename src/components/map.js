import React from 'react'
import {
    Map,
    Polygon,
    TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: generateColors(15, 15),
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(number) {
        let colors = this.state.color;
        colors[number] = 'blue'
        this.setState(state => ({
            color: colors
        }));

        console.log('Color id: ' + number + ' updated!')
    }

    render() {
        const center = [53.737553, 22.840776]
        const polygon = generateGrid(15, 15);

        return (
            <Map center={center} zoom={15} style={{width: '100%', height: '100vh'}} dragging={false} zoomControl={false}
                 scrollWheelZoom={false}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {polygon.map((item, number) => (
                    <>
                        <Polygon color={this.state.color[number]} positions={item} onClick={(e) => this.handleClick(number)}/>
                    </>
                ))
                }

            </Map>
        )
    }
}

function generateGrid(x, y) {
    const polygon = [];
    let polygonTemp = [];

    const offset = 0.0013;
    const coords = {
        x: 53.727586,
        y: 22.832943
    }

    for (let n = 0; n < x; n++) {
        for (let m = 0; m < y; m++) {
            polygonTemp.push([coords.x + n * offset, coords.y + m * offset])
            polygonTemp.push([coords.x + n * offset, coords.y + offset + m * offset])
            polygonTemp.push([coords.x + offset + n * offset, coords.y + offset + m * offset])
            polygonTemp.push([coords.x + offset + n * offset, coords.y + m * offset])
            polygon.push(polygonTemp)
            polygonTemp = [];
        }

    }

    return polygon;
}

function generateColors(x, y) {
    const polygon = [];
    const color = ['red', 'orange', 'green']


    for (let n = 0; n < x * y; n++) {
        polygon.push(color[Math.floor(Math.random() * 3)])
    }

    return polygon;
}

export default MapComponent;
