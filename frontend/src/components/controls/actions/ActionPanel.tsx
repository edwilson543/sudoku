import React, { SetStateAction } from "react";

import ValidateButton from "./ValidateButton";
import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

type ActionPanelProps = {
  activeCell: ActiveCell;
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
  isSolved: boolean;
};

export default function ActionPanel({
  activeCell,
  validationIsOn,
  setValidationIsOn,
  isSolved,
}: ActionPanelProps) {
  return (
    <div className={"action-panel"}>
      <UndoButton isSolved={isSolved} />
      <EraseButton activeCell={activeCell} isSolved={isSolved} />
      <ValidateButton
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
    </div>
  );
}
