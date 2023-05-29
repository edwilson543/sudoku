import NumberInputPanel from "./NumberInputPanel";
import ActionPanel from "./ActionPanel";

export default function ControlPanel({ sudoku, activeCell }) {
  return (
    <div className={"control-panel"}>
      <ActionPanel />
      <NumberInputPanel sudoku={sudoku} activeCell={activeCell} />
    </div>
  );
}
