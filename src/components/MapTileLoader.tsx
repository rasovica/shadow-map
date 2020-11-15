import React from "react";
import { Polygon, useMapEvents } from "react-leaflet";
import sector from "@turf/sector";

import { CameraContext } from "../state/camera/CameraContext";
import { latLngBounds } from "leaflet";
import { usePrevious } from "../hooks/usePrevious";

export const MapTileLoader: React.FC = () => {
  const { actions, tiles, active } = React.useContext(CameraContext);
  const prevActive = usePrevious(active);

  const map = useMapEvents({
    moveend: () => {
      actions?.loadLocation(map.getBounds());
    },
  });

  React.useEffect(() => {
    map.invalidateSize();
    actions?.loadLocation(map.getBounds());
  }, []);

  React.useEffect(() => {
    if (active === null) {
      map.dragging.enable();
    } else if (prevActive === null) {
      const sectorPoly = sector(
        [active.lat, active.lng],
        active.distance / 1000,
        active.orientation - active.angle / 2,
        active.orientation + active.angle / 2
      );
      map.dragging.disable();

      if (sectorPoly && sectorPoly.geometry) {
        const bounds = latLngBounds(sectorPoly.geometry.coordinates as any).pad(
          Math.sqrt(2) / 2
        );

        map.fitBounds(bounds);
      }
    }
  }, [active]);

  return (
    <>
      {Object.values(tiles).flatMap((item) =>
        item?.map((i) => {
          const sectorPoly = sector(
            [i.lat, i.lng],
            i.distance / 1000,
            i.orientation - i.angle / 2,
            i.orientation + i.angle / 2
          );

          return (
            <Polygon
              key={i.id}
              smoothFactor={0.1}
              pathOptions={{
                color: i.id === active?.id ? "#1b03a3" : "#ff073a",
                weight: 0.5,
              }}
              positions={(sectorPoly?.geometry?.coordinates || []) as any}
              eventHandlers={{
                click: () => actions?.setActive(i),
              }}
            />
          );
        })
      )}
    </>
  );
};
