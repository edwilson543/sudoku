import ClueCell from "./ClueCell";
import GameCell from "./GameCell";


export default function CellRow({problemRow, solutionRow, rowMoves}) {
    /**
     A row of cells in the sudoku board.
     *
     * @property solutionRow: An array of integers representing the solution for this row
     * @property problemRow: A mix of integers and null, representing the problem.
     * @property rowMoves: An array of moves the player has already completed, of the same
     *      length as solutionRow and problemRow
     * */
    return (
        <div className={"cell-row"}>
            {solutionRow.map((solutionValue, colIndex) => {
                if (problemRow[colIndex] === solutionValue) {
                    return <ClueCell key={colIndex} value={solutionValue}/>;
                } else {
                    return <GameCell key={colIndex} move={rowMoves[colIndex]}/>
                }
            })}
        </div>
    );
}
