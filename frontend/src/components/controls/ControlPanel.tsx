import React, { SetStateAction } from "react";

import NumberInputPanel from "./input/NumberInputPanel";
import ActionPanel from "./actions/ActionPanel";
import NewGame from "./new/NewGame";

type ControlPanelProps = {
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
};

export default function ControlPanel({
  validationIsOn,
  setValidationIsOn,
}: ControlPanelProps) {
  return (
    <div className={"control-panel"}>
      <ActionPanel
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
      <NumberInputPanel />
      <NewGame />
    </div>
  );
}
