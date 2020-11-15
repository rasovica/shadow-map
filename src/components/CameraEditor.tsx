import React, { useContext } from "react";
import styled from "styled-components";
import css from "@styled-system/css";

import { CameraContext } from "../state/camera/CameraContext";
import { Filed } from "./Field";
import { Camera } from "../types/Camera";
import { CloseButton, SaveButton } from "./Buttons";
import { usePrevious } from "../hooks/usePrevious";
import { UserContext } from "../state/user/UserContext";

const CameraEditorContainer = styled("div")(
  css({
    top: "4",
    right: "4",
    position: "absolute",
    padding: "16px",
    border: "1px solid #faed27",
    borderRadius: "5px",
    background: "#080808",
    width: "300px",
  }) as any
);

const EDITABLE_FIELDS = ["title", "angle"];

export const CameraEditor: React.FC = () => {
  const { user } = useContext(UserContext);
  const { active, actions } = useContext(CameraContext);
  const prevActive = usePrevious(active);
  const [clean, setClean] = React.useState<Camera | null>(null);

  React.useEffect(() => {
    if (active && prevActive === null) {
      setClean(active);
    }
  }, [active]);

  React.useEffect(() => {
    if (clean) {
      actions?.updateCamera({
        ...active,
        title: clean.title,
        angle: clean.angle,
      } as Camera);
      actions?.setActive({
        ...active,
        title: clean.title,
        angle: clean.angle,
      } as Camera);
    }
  }, [clean]);

  const save = React.useCallback(() => {
    actions?.setActive(null);

    if (clean && active) {
      actions?.updateCamera(
        {
          ...active,
          title: clean.title,
          angle: clean.angle,
        },
        true
      );
    }
  }, [active, clean]);

  if (active === null || clean === null) {
    return null;
  }

  return (
    <CameraEditorContainer>
      <CloseButton
        onClick={() => {
          actions?.setActive(null);
          if (active.id !== "tobedetermined") {
            actions?.updateCamera({
              ...clean,
              title: active?.title,
            } as Camera);
          } else {
            actions?.deleteCamera(active);
          }
        }}
      >
        ✗
      </CloseButton>
      {EDITABLE_FIELDS.map((key) => (
        <Filed
          key={key}
          value={clean?.[key as keyof Camera]}
          label={key}
          readOnly={active?.owner !== user?.uid}
          onChange={(value) =>
            setClean((prev) => (prev ? { ...prev, [key]: value } : null))
          }
        />
      ))}
      {active.owner === user?.uid && (
        <SaveButton onClick={() => save()}>Save</SaveButton>
      )}
    </CameraEditorContainer>
  );
};
