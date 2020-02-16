import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {defaultGlobalState, GlobalContext} from "./util/state";
import {Map} from "./routes/Map";

export const App = () => {
  return (
      <GlobalContext.Provider value={defaultGlobalState} >
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <Map />
                    </Route>
                </Switch>
            </BrowserRouter>
      </GlobalContext.Provider>
  );
};
