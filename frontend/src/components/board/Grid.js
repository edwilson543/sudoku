import CellRow from "./CellRow";


export default function Grid({sudoku, moves, activeCell, setActiveCell}) {
    /** The grid of cells in a game of sudoku. */
    return (
        <div className={"grid"}>
            {sudoku.problem.map((problemRow, rowIndex) => {
                return (
                    <CellRow
                        key={rowIndex}
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
