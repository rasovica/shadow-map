import * as React from 'react'
import styled from 'styled-components';
import {useContext} from "react";
import {ZoomControl, Map, TileLayer} from 'react-leaflet';

import {Debug} from "./Debug";
import {GlobalContext} from "../util/state";


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

export const LeafletMap: React.FunctionComponent = () => {
    const {location} = useContext(GlobalContext);

    return (
        <MapContainer>
            <Map center={location} zoom={13} zoomControl={false}>
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution="FASTLY"
                />
                <ZoomControl zoom={13} position="topright" />
                <Debug position={location}/>
            </Map>
        </MapContainer>
    )
};
