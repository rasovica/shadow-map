import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";

import {GlobalContext} from "./state";

export const ProtectedRoute = ({path, component}) => {
    const context = useContext(GlobalContext);

    if (context.token === null) {
        return (
            <Redirect to={"/"} />
        )
    }

    return (
        <Route path={path} component={component}/>
    )
};
