import React, { useContext } from "react";
import styled from "styled-components";
import css from "@styled-system/css";

import { CameraContext } from "../state/camera/CameraContext";
import { Filed } from "./Field";
import { Camera } from "../types/Camera";
import { CloseButton, SaveButton } from "./Buttons";
import { usePrevious } from "../hooks/usePrevious";

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

const EDITABLE_FIELDS = ["title"];

export const CameraEditor: React.FC = () => {
  const { active, actions } = useContext(CameraContext);
  const prevActive = usePrevious(active);
  const [clean, setClean] = React.useState<Camera | null>(null);

  React.useEffect(() => {
    if (active && prevActive === null) {
      setClean(active);
    }
  }, [active]);

  const save = React.useCallback(() => {
    actions?.setActive(null);

    if (clean && active) {
      actions?.updateCamera(
        {
          ...active,
          title: clean.title,
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
          onChange={(value) =>
            setClean((prev) => (prev ? { ...prev, [key]: value } : null))
          }
        />
      ))}
      <SaveButton onClick={() => save()}>Save</SaveButton>
    </CameraEditorContainer>
  );
};
