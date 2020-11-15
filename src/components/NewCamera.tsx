import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { MapCustomControl } from "./MapCustomControl";
import { UserContext } from "../state/user/UserContext";
import { signInWithGoogle } from "../state/firebase";

const NewCameraWrapper = styled.div`
  background: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface NewCameraProps {
  setNewCameraMode: () => void;
}

export const NewCamera: React.FC<NewCameraProps> = ({ setNewCameraMode }) => {
  const { user } = React.useContext(UserContext);

  return (
    <MapCustomControl position="bottomleft">
      <NewCameraWrapper
        onClick={() => (user ? setNewCameraMode() : signInWithGoogle())}
      >
        <FontAwesomeIcon icon={faVideo} />
      </NewCameraWrapper>
    </MapCustomControl>
  );
};
