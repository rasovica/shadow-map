import * as React from "react";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {defaultGlobalState, GlobalStateType, GlobalContext} from "./util/state";
import {Map} from "./routes/Map";
import {useApi} from "./hooks/useApi";
import {Methods, Routes} from "./interfaces/api";

export const App = () => {
    const [context, setContext] = useState<GlobalStateType>(defaultGlobalState);
    const {data: locationData} = useApi({location: Routes.location, method: Methods.get});
    useEffect(() => {
        setContext({
            ...context,
            ...locationData,
            setContext,
        })
    }, [JSON.stringify(context), JSON.stringify(locationData)]);

    return (
        <GlobalContext.Provider value={context}>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <Map/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </GlobalContext.Provider>
    );
};
