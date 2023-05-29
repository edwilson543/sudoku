import EraseButton from "./EraseButton";
import UndoButton from "./UndoButton";

export default function ActionPanel() {
  return (
    <div className={"action-panel"}>
      <UndoButton />
      <EraseButton />
    </div>
  );
}
