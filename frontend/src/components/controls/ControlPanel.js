import NumberInputPanel from "./NumberInputPanel";
import ActionPanel from "./ActionPanel";

export default function ControlPanel({ sudoku, activeCell, setActiveCell }) {
  return (
    <div className={"control-panel"}>
      <ActionPanel activeCell={activeCell} />
      <NumberInputPanel
        sudoku={sudoku}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />
    </div>
  );
}
