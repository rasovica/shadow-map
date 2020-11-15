import React from "react";
import * as ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import "./style/global.css";

import { App } from "./App";

Sentry.init({
  dsn:
    "https://5559fad401054db38a3eb6a9cf518f78@o477035.ingest.sentry.io/5517406",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
