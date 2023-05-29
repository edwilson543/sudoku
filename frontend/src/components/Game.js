import { useState } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import { MovesProvider } from "../context/MovesContext";

export default function Game({ sudoku, existingMoves }) {
  /** A game of sudoku, including the grid and the controls. */
  // Set the initially active cell to a non-existent one
  const initialActiveCell = {
    row: -1,
    column: -1,
    tile: -1,
    value: -1,
    isClueCell: null,
  };
  const [activeCell, setActiveCell] = useState(initialActiveCell);

  return (
    <div className={"game"}>
      <MovesProvider>
        <Grid
          sudoku={sudoku}
          existingMoves={existingMoves}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
        />
        <ControlPanel
          sudoku={sudoku}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
        />
      </MovesProvider>
    </div>
  );
}
