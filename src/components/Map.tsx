import { TileLayer, MapContainer } from "react-leaflet";
import { Map as M } from "leaflet";
import styled from "styled-components";
import React from "react";

import { Ljubljana } from "../util/location";
import { MapTileLoader } from "./MapTileLoader";
import { Debug } from "./Debug";
import { DragHandler } from "./DragHandler";
import { Search } from "./Search";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  z-index: 0;
`;

export const Map = () => {
  const map = React.useRef<M | null>(null);
  const tileLayer = React.useRef<any | null>(null);
  const [retried, setRetried] = React.useState<Record<string, boolean>>({});

  const retry = React.useCallback(
    (error) => {
      if (tileLayer.current !== null) {
        const tileUrl = new URL(tileLayer.current!.getTileUrl(error.coords));

        if (!retried[tileUrl.toString()]) {
          setRetried((prev) => ({
            ...prev,
            [tileUrl.toString()]: true,
          }));

          tileUrl.searchParams.append("retry", "1");
          error.tile.src = tileUrl.toString();
        }
      }
    },
    [JSON.stringify(retried), setRetried]
  );

  return (
    <MapWrapper>
      <MapContainer
        center={Ljubljana}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom={true}
        whenCreated={(m) => (map.current = m)}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
          maxZoom={20}
          minZoom={12}
          ref={tileLayer}
          maxNativeZoom={18}
          attribution="FASTLY"
          eventHandlers={{
            load: () => map.current?.invalidateSize(),
            tileerror: retry,
          }}
        />
        <MapTileLoader />
        <DragHandler />
        <Search />
        {import.meta.env.MODE === "development" && <Debug />}
      </MapContainer>
    </MapWrapper>
  );
};
