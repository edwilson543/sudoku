import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

export default function ActionPanel({ activeCell }) {
  return (
    <div className={"action-panel"}>
      <UndoButton />
      <EraseButton activeCell={activeCell} />
    </div>
  );
}
