import Cell from "./Cell";

export default function CellRow({
  sudoku,
  rowIndex,
  problemRow,
  solutionRow,
  rowMoves,
  activeCell,
  setActiveCell,
}) {
  /** A row of cells in the sudoku board. */
  return (
    <div className={"cell-row"}>
      {solutionRow.map((solutionValue, colIndex) => {
        const isClueCell = problemRow[colIndex] === solutionValue;
        let value;
        if (isClueCell) {
          value = solutionValue;
        } else {
          value = rowMoves[colIndex] ? rowMoves[colIndex].value : null;
        }
        return (
          <Cell
            key={colIndex}
            sudokuSize={sudoku.size}
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
