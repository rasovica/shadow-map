import React from "react";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const MapCustomControl: React.FC<MapCustomControlProps> = (props) => {
  const { position, children } = props;
  return (
    <div className="leaflet-control-container">
      <div className={POSITION_CLASSES[position]}>
        <div className="leaflet-control leaflet-bar">{children}</div>
      </div>
    </div>
  );
};

export type MapCustomControlProps = {
  position: keyof typeof POSITION_CLASSES;
};

MapCustomControl.defaultProps = {
  position: "topleft" as MapCustomControlProps["position"],
};

export { MapCustomControl };
