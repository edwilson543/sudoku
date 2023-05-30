import NumberInputPanel from "./NumberInputPanel";
import ActionPanel from "./ActionPanel";
import NewGame from "./NewGame";

export default function ControlPanel({
  sudoku,
  activeCell,
  setActiveCell,
  validationIsOn,
  setValidationIsOn,
}) {
  return (
    <div className={"control-panel"}>
      <ActionPanel
        activeCell={activeCell}
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
      <NumberInputPanel
        sudoku={sudoku}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />
      <NewGame />
    </div>
  );
}
