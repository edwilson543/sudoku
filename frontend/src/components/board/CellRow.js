import Cell from "./Cell";


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
                const isClueCell = problemRow[colIndex] === solutionValue;
                let value = null;
                if (isClueCell) {
                    value = solutionValue;
                } else {
                    value = rowMoves[colIndex] ? rowMoves[colIndex].value : ''
                }
                return (
                    <Cell
                        key={colIndex}
                        isClueCell={isClueCell}
                        value={value}
                        rowIndex={rowIndex}
                        columnIndex={colIndex}
                        activeCell={activeCell}
                        setActiveCell={setActiveCell}
                    />
                );
            })}
        </div>
    );
}
