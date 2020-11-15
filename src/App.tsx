import React from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "./theme";
import { CameraProvider } from "./state/camera/CameraContext";
import { Map } from "./components/Map";
import { CameraEditor } from "./components/CameraEditor";
import { UserProvider } from "./state/user/UserContext";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CameraProvider>
          <div>
            <Map />
            <CameraEditor />
          </div>
        </CameraProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
