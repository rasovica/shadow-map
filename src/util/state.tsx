import * as React from "react";

type GlobalStateType = {
    token: null | string;
}

export const defaultGlobalState: GlobalStateType = {
    token: null
};

export const GlobalContext = React.createContext<GlobalStateType>(defaultGlobalState);
