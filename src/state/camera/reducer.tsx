import { CameraState } from "./CameraContext";

export enum CameraActions {
  LOAD_TILE,
  UPDATE_CAMERA,
  DELETE_CAMERA,
  SET_ACTIVE,
}

type Action<Actions extends number> = {
  type: Actions;
  payload: any;
};

export const cameraReducer = (
  state: CameraState,
  action: Action<CameraActions>
) => {
  switch (action.type) {
    case CameraActions.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case CameraActions.LOAD_TILE:
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [action.payload.id]: action.payload.cameras,
        },
      };
    case CameraActions.UPDATE_CAMERA:
      if (state.tiles[action.payload.geoIndex[0]] === undefined) {
        state.tiles[action.payload.geoIndex[0]] = [];
      }

      const cameras = state.tiles[action.payload.geoIndex[0]] || [];
      const cameraIndex = cameras!.findIndex((i) => i.id === action.payload.id);

      cameras[cameraIndex !== -1 ? cameraIndex : cameras.length] =
        action.payload;

      return {
        ...state,
        tiles: {
          ...state.tiles,
          [action.payload.geoIndex[0]]: cameras,
        },
      };
    case CameraActions.DELETE_CAMERA:
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [action.payload.geoIndex[0]]: (
            state.tiles[action.payload.geoIndex[0]] || []
          ).filter((i) => i.id !== action.payload.id),
        },
      };
  }
  return state;
};
