import CellRow from "./CellRow";
import { useMoves } from "../../context/MovesContext";

export default function Grid({
  sudoku,
  existingMoves,
  activeCell,
  setActiveCell,
}) {
  /** The grid of cells in a game of sudoku. */
  const moves = combineAllMoves(useMoves(), existingMoves, sudoku.size);

  return (
    <div className={"grid"}>
      {sudoku.problem.map((problemRow, rowIndex) => {
        return (
          <CellRow
            key={rowIndex}
            sudoku={sudoku}
            rowIndex={rowIndex}
            problemRow={problemRow}
            solutionRow={sudoku.solution[rowIndex]}
            rowMoves={moves[rowIndex]}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
          />
        );
      })}
    </div>
  );
}

function combineAllMoves(stateMoves, existingMoves, sudokuSize) {
  /** Combine the moves received from the API with the moves held in state */
  // Create initial datastructure for moves (an array of rows, which are also arrays)
  let rows = [];
  for (let rowIndex = 0; rowIndex < sudokuSize; rowIndex++) {
    rows.push(new Array(sudokuSize).fill(null));
  }

  // Add the moves received over the API
  for (let move of existingMoves) {
    if (!move.is_erased) {
      rows[move.row][move.column] = {
        value: move.value,
        is_correct: move.is_correct,
      };
    }
  }

  // Add the moves held in state
  // Note the last move for any index will overwrite all previous values,
  // including more recent moves with `isErased: true`
  for (let move of stateMoves) {
    rows[move.row][move.column] = {
      value: move.value,
      is_correct: move.isCorrect,
    };
  }
  return rows;
}
