import * as React from "react";
import {login} from "./util/netlify";

export const App = () => {
  return (
      <button onClick={login}>Login github</button>
  );
};