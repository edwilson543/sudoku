import React, { SetStateAction } from "react";

import { MoveType } from "../../../utils/constants";
import { useMovesDispatch, useMoves } from "../../../context/movesContext";
import useAPI from "../../../services/apiClient/useAPI";

type NumberInputProps = {
  value: number;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  isSolved: boolean;
};

export default function NumberInput({
  value,
  activeCell,
  setActiveCell,
  isSolved,
}: NumberInputProps) {
  const movesDispatch = useMovesDispatch();
  const moves = useMoves();
  const restClient = useAPI();
  // Disabled if the player hasn't clicked on a cell yet or the game is over
  const isDisabled = activeCell.row === -1 || isSolved;

  function handleClick(): void {
    movesDispatch({
      type: MoveType.Create,
      row: activeCell.row,
      column: activeCell.column,
      value: value,
    });

    // Need to update the value stored in the activeCell state
    setActiveCell({
      row: activeCell.row,
      column: activeCell.column,
      tile: activeCell.tile,
      value: value,
      isClueCell: activeCell.isClueCell,
    });

    // Record the move in the backend
    restClient.makeMove(moves.length, activeCell.row, activeCell.column, value);
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
