import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";

import React from "react";

import { Ljubljana } from "../util/location";
import { MapTileLoader } from "./MapTileLoader";
import { Debug } from "./Debug";
import { DragHandler } from "./DragHandler";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
`;

export const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={Ljubljana}
        zoom={13}
        scrollWheelZoom={true}
        whenCreated={(m) => {
          m.invalidateSize();
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
          maxZoom={20}
          maxNativeZoom={18}
          attribution="FASTLY"
        />
        <MapTileLoader />
        <DragHandler />
        {import.meta.env.MODE === "development" && <Debug />}
      </MapContainer>
    </MapWrapper>
  );
};
