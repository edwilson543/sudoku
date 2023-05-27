import Grid from "./board/Grid";


export default function Game({sudoku, existingMoves}) {
    /**
     * A game of sudoku, including the grid and the controls.
     *
     * @property sudoku: Object containing the sudoku problem and solution.
     * @property moves: Moves that existed at the start of the game.
     */
    return (
      <div className={"game"}>
          <Grid sudoku={sudoku} moves={combineAllMoves(existingMoves, sudoku.size)}/>
      </div>
    );
};

function combineAllMoves(existingMoves, sudokuSize) {
    /** Combine the moves received from the API with the moves held in state */
    let rows = [];
    for (let rowIndex = 0; rowIndex < sudokuSize; rowIndex++) {
        rows.push(new Array(sudokuSize).fill(null));
    }
    for (let move of existingMoves) {
        rows[move.row][move.column] = {"value": move.value, "is_correct": move.is_correct};
    }
    return rows;
}
