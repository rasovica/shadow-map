import * as React from "react";
import { LatLngTuple } from 'leaflet';


export type GlobalStateType = {
    token: null | string;
    proxy: null | boolean;
    location: LatLngTuple;
    setContext;
}

export const defaultGlobalState: GlobalStateType = {
    token: null,
    proxy: null,
    location: [51.505, -0.09],
    setContext: null,
};

export const GlobalContext = React.createContext<GlobalStateType>(defaultGlobalState);
