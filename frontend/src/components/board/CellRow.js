import Cell from "./Cell";

export default function CellRow({
  sudoku,
  rowIndex,
  rowMoves,
  activeCell,
  setActiveCell,
  validationIsOn,
}) {
  /** A row of cells in the sudoku board. */
  const solutionRow = sudoku.solution[rowIndex];
  return (
    <div className={"cell-row"}>
      {solutionRow.map((solutionValue, colIndex) => {
        return (
          <Cell
            key={colIndex}
            sudoku={sudoku}
            move={rowMoves[colIndex]}
            rowIndex={rowIndex}
            columnIndex={colIndex}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            validationIsOn={validationIsOn}
          />
        );
      })}
    </div>
  );
}
