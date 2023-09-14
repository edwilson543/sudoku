import React, { SetStateAction } from "react";

import ValidateButton from "./ValidateButton";
import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

type ActionPanelProps = {
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
  isSolved: boolean;
};

export default function ActionPanel({
  validationIsOn,
  setValidationIsOn,
  isSolved,
}: ActionPanelProps) {
  return (
    <div className={"action-panel"}>
      <UndoButton isSolved={isSolved} />
      <EraseButton isSolved={isSolved} />
      <ValidateButton
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
    </div>
  );
}
