import React, { useReducer } from "react";
import { LatLngBounds } from "leaflet";
import { h3ToParent } from "h3-js";

import { CameraActions, cameraReducer } from "./reducer";
import { Location } from "../../util/location";
import { getCamerasForIndex } from "./api";
import { Camera } from "../../types/Camera";
import { camerasRef } from "../firebase";

const actions = (state: CameraState, dispatch: (a: any) => void) => ({
  setActive: (camera: Camera | null) => {
    dispatch({
      type: CameraActions.SET_ACTIVE,
      payload: camera,
    });
  },
  updateCamera: async (camera: Camera, save = false) => {
    if (save) {
      const cameraSave = { ...camera };
      delete cameraSave.id;

      if (camera.id === "tobedetermined") {
        const saveRef = await camerasRef.add(cameraSave);

        cameraSave.id = saveRef.id;
      } else {
        await camerasRef.doc(camera.id).set(cameraSave);
      }

      dispatch({
        type: CameraActions.UPDATE_CAMERA,
        payload: {
          ...cameraSave,
          id: cameraSave.id || camera.id,
        },
      });

      return;
    }

    dispatch({
      type: CameraActions.UPDATE_CAMERA,
      payload: camera,
    });
  },
  deleteCamera: async (c: Camera, commit = false) => {
    if (commit) {
      await camerasRef.doc(c.id).delete();
    }

    dispatch({
      type: CameraActions.DELETE_CAMERA,
      payload: c,
    });
  },
  loadLocation: async (bounds: LatLngBounds) => {
    await Promise.all(
      Location.getFeatures(bounds, 7)
        .map((i) => h3ToParent(i, 5))
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .map(async (index) => {
          if (state.tiles[index] === undefined) {
            const tile = await getCamerasForIndex(index);

            dispatch({
              type: CameraActions.LOAD_TILE,
              payload: {
                id: index,
                cameras: tile,
              },
            });
          }
        })
    );
  },
});

const cameraInitialState: CameraState = {
  tiles: {},
  actions: null,
  active: null,
};
const actionsRes = actions(cameraInitialState, () => {});

export interface CameraState {
  tiles: {
    [id: string]: Camera[] | undefined;
  };
  actions: typeof actionsRes | null;
  active: Camera | null;
}
export const CameraContext = React.createContext<CameraState>(
  cameraInitialState
);

export const CameraProvider: React.FC = ({ children }) => {
  const [cameraState, dispatch] = useReducer(cameraReducer, cameraInitialState);

  return (
    <CameraContext.Provider
      value={{ ...cameraState, actions: actions(cameraState, dispatch) }}
    >
      {children}
    </CameraContext.Provider>
  );
};
