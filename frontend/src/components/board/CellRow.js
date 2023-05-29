import ClueCell from "./ClueCell";
import GameCell from "./GameCell";


export default function CellRow(
    {rowIndex, problemRow, solutionRow, rowMoves, activeCell, setActiveCell}
) {
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
                    return (
                        <ClueCell
                            key={colIndex}
                            rowIndex={rowIndex}
                            columnIndex={colIndex}
                            value={solutionValue}
                            activeCell={activeCell}
                            setActiveCell={setActiveCell}
                        />);
                } else {
                    return (
                        <GameCell
                            key={colIndex}
                            rowIndex={rowIndex}
                            columnIndex={colIndex}
                            move={rowMoves[colIndex]}
                            activeCell={activeCell}
                            setActiveCell={setActiveCell}
                        />
                    );
                }
            })}
        </div>
    );
}
