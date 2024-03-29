import React, { SetStateAction } from "react";

import ValidateButton from "./ValidateButton";
import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

type ActionPanelProps = {
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
};

export default function ActionPanel({
  validationIsOn,
  setValidationIsOn,
}: ActionPanelProps) {
  return (
    <div className={"action-panel"}>
      <UndoButton />
      <EraseButton />
      <ValidateButton
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
    </div>
  );
}
