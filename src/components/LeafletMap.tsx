import * as React from 'react'
import styled from 'styled-components';
import { Map, TileLayer } from 'react-leaflet'
import {Debug} from "./Debug";


const position = [51.505, -0.09];

const MapContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    
    .leaflet-container {
        width: 100%;
        height: 100%;
    }
`;

export const LeafletMap = () => {
    return (
        <MapContainer>
            <Map center={position} zoom={13}>
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution="FASTLY"
                />
                <Debug position={position} />
            </Map>
        </MapContainer>
    )
};
