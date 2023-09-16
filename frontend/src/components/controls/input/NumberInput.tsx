import React from "react";

import { useInterpretedGameContext } from "../../../context/context";
import { GameEvent, GameState } from "../../../machines/game/types";

type NumberInputProps = {
  value: number;
};

export default function NumberInput({ value }: NumberInputProps) {
  const { current, send } = useInterpretedGameContext();
  const isSolved = current.matches(GameState.SOLVED);
  const activeCell = current.context.activeCell;

  const isDisabled =
    // The player hasn't clicked on a cell yet
    activeCell.row === -1 ||
    // The active cell is a clue cell
    activeCell.isClueCell ||
    // The active cell already has this input value in it
    activeCell.value === value ||
    // The game is over
    isSolved;

  function handleClick(): void {
    send({
      type: GameEvent.MAKE_MOVE,
      row: activeCell.row,
      column: activeCell.column,
      value: value,
    });
  }

  return (
    <button
      className={"number-input"}
      onClick={handleClick}
      disabled={isDisabled}
      data-testid={"number-input-" + value}
    >
      {value}
    </button>
  );
}
