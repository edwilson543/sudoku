import CellRow from "./CellRow";


export default function Grid({sudoku, moves}) {
    /**
     * The grid of cells in a game of sudoku.
     *
     * @property sudoku: Object containing the sudoku problem and solution.
     * @property moves: An array of arrays of moves for each row. Same shape as problem & solution.
     */
    return (
        <div className={"grid"}>
            {sudoku.problem.map((problemRow, rowIndex) => {
                return (
                    <CellRow
                        key={rowIndex}
                        problemRow={problemRow}
                        solutionRow={sudoku.solution[rowIndex]}
                        rowMoves={moves[rowIndex]}
                    />
                );
            })}
        </div>
    );
}
