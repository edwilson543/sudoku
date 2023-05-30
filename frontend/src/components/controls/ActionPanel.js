import ValidateButton from "./ValidateButton";
import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

export default function ActionPanel({
  activeCell,
  validationIsOn,
  setValidationIsOn,
  isSolved,
}) {
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
