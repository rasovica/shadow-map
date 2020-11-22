import React from "react";
import { Polyline } from "react-leaflet";
import { h3ToGeoBoundary } from "h3-js";
import { LatLngExpression } from "leaflet";

import { CameraContext } from "../state/camera/CameraContext";
import { Camera } from "../types/Camera";

export const Debug = () => {
  const { tiles } = React.useContext(CameraContext);

  return (
    <Polyline
      pathOptions={{ color: "#ff073a" }}
      positions={Object.values(tiles).flatMap((c: Camera[] | undefined) =>
        c === undefined
          ? []
          : c.map((j) =>
              j.geoIndex.map(
                (index) => h3ToGeoBoundary(index) as LatLngExpression[]
              )
            )
      )}
    />
  );
};
