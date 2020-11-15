import React from "react";
import { Polyline } from "react-leaflet";
import { h3ToGeoBoundary } from "h3-js";
import { LatLngExpression } from "leaflet";

import { CameraContext } from "../state/camera/CameraContext";

export const Debug = () => {
  const { tiles } = React.useContext(CameraContext);
  const [tileIds, setTileIds] = React.useState<string[]>([]);
  React.useEffect(() => {
    setTileIds(Object.keys(tiles));
  }, [tiles]);

  return (
    <Polyline
      pathOptions={{ color: "#ff073a" }}
      positions={tileIds.map(
        (index) => h3ToGeoBoundary(index) as LatLngExpression[]
      )}
    />
  );
};
