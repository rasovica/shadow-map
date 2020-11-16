import { MapContainer, TileLayer } from "react-leaflet";
import { Map as M } from "leaflet";
import styled from "styled-components";

import React from "react";

import { Ljubljana } from "../util/location";
import { MapTileLoader } from "./MapTileLoader";
import { Debug } from "./Debug";
import { DragHandler } from "./DragHandler";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  z-index: 0;
`;

export const Map = () => {
  const map = React.useRef<M | null>(null);

  return (
    <MapWrapper>
      <MapContainer
        center={Ljubljana}
        zoom={16}
        scrollWheelZoom={true}
        whenCreated={(m) => (map.current = m)}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
          maxZoom={20}
          minZoom={12}
          maxNativeZoom={18}
          attribution="FASTLY"
          eventHandlers={{
            load: () => map.current?.invalidateSize(),
          }}
        />
        <MapTileLoader />
        <DragHandler />
        {import.meta.env.MODE === "development" && <Debug />}
      </MapContainer>
    </MapWrapper>
  );
};
