import Cell from "./Cell";


export default function CellRow(
    {rowIndex, problemRow, solutionRow, rowMoves, activeCell, setActiveCell}
) {
    /** A row of cells in the sudoku board. */
    return (
        <div className={"cell-row"}>
            {solutionRow.map((solutionValue, colIndex) => {
                const isClueCell = problemRow[colIndex] === solutionValue;
                let value;
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
