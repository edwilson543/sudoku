import NumberInputPanel from "./NumberInputPanel";
import ActionPanel from "./ActionPanel";
import NewGame from "./NewGame";

export default function ControlPanel({
  sudoku,
  activeCell,
  setActiveCell,
  validationIsOn,
  setValidationIsOn,
  isSolved,
}) {
  return (
    <div className={"control-panel"}>
      <ActionPanel
        activeCell={activeCell}
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
        isSolved={isSolved}
      />
      <NumberInputPanel
        sudoku={sudoku}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        isSolved={isSolved}
      />
      <NewGame isSolved={isSolved} />
    </div>
  );
}
