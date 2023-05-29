import { useState } from "react";

import Grid from "./board/Grid";
import NumberInputPanel from "./controls/NumberInputPanel";
import { MovesProvider } from "../context/MovesContext";
import { SudokuSizeContext } from "../context/SudokuSizeConext";

export default function Game({ sudoku, existingMoves }) {
  /** A game of sudoku, including the grid and the controls. */
  // Set the initially active cell to a non-existent one
  const initialActiveCell = {
    row: -1,
    column: -1,
    tile: -1,
    value: -1,
  };
  const [activeCell, setActiveCell] = useState(initialActiveCell);

  return (
    <div className={"game"}>
      <MovesProvider>
        <SudokuSizeContext.Provider value={sudoku.size}>
          <Grid
            sudoku={sudoku}
            existingMoves={existingMoves}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
          />
          <div className={"control-panel"}>
            <NumberInputPanel sudoku={sudoku} activeCell={activeCell} />
          </div>
        </SudokuSizeContext.Provider>
      </MovesProvider>
    </div>
  );
}
