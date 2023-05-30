import CellRow from "./CellRow";

export default function Grid({
  sudoku,
  moves,
  activeCell,
  setActiveCell,
  validationIsOn,
  isSolved,
}) {
  /** The grid of cells in a game of sudoku. */
  return (
    <div className={"grid"}>
      {sudoku.problem.map((problemRow, rowIndex) => {
        return (
          <CellRow
            key={rowIndex}
            sudoku={sudoku}
            rowIndex={rowIndex}
            rowMoves={moves[rowIndex]}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            validationIsOn={validationIsOn}
            isSolved={isSolved}
          />
        );
      })}
    </div>
  );
}
