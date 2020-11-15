import React from "react";
import * as ReactDOM from "react-dom";

import "./style/global.css";

import { App } from "./App";

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
