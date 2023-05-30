import ValidateButton from "./ValidateButton";
import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

export default function ActionPanel({
  activeCell,
  validationIsOn,
  setValidationIsOn,
}) {
  return (
    <div className={"action-panel"}>
      <UndoButton />
      <EraseButton activeCell={activeCell} />
      <ValidateButton
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
    </div>
  );
}
