import React from "react";
import { useMapEvents } from "react-leaflet";
import { latLng } from "leaflet";

import { CameraContext } from "../state/camera/CameraContext";
import { bearing } from "../util/math";
import { NewCamera } from "./NewCamera";
import { initCamera } from "../util/camera";

enum Modes {
  NONE,
  EDIT,
  CREATE,
}

export const DragHandler: React.FC = () => {
  const { active, actions } = React.useContext(CameraContext);
  const [mode, setMode] = React.useState<Modes>(Modes.NONE);

  const map = useMapEvents({
    mousedown: (event) => {
      if (active) {
        setMode(Modes.EDIT);
      } else if (mode === Modes.CREATE) {
        const newCamera = initCamera(event.latlng);

        actions?.updateCamera(newCamera);
        actions?.setActive(newCamera);
        setMode(Modes.EDIT);
      }
    },
    mousemove: (event) => {
      if (active && mode === Modes.EDIT) {
        const newDistance = map.distance(
          [active.lat, active.lng],
          event.latlng
        );
        const newCamera = {
          ...active,
          orientation:
            90 - bearing(latLng(active.lat, active.lng), event.latlng),
          distance: newDistance,
        };

        actions?.updateCamera(newCamera);
        actions?.setActive(newCamera);
      }
    },
    mouseup: () => {
      if (active && mode === Modes.EDIT) {
        setMode(Modes.NONE);
      }
    },
  });

  return <NewCamera setNewCameraMode={() => setMode(Modes.CREATE)} />;
};
