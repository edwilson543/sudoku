import {useState} from "react";

import Grid from "./board/Grid";
import NumberInputPanel from "./controls/NumberInputPanel";
import {SudokuSizeContext} from "./SudokuSizeConext";


export default function Game({sudoku, existingMoves}) {
    /** A game of sudoku, including the grid and the controls. */
    // Set the initially active cell to a non-existent one
    const initialActiveCell = {
        rowIndex: -1,
        columnIndex: -1,
        tileIndex: -1,
        value: -1,
    };
    const [activeCell, setActiveCell] = useState(initialActiveCell);

    return (
        <div className={"game"}>
            <SudokuSizeContext.Provider value={sudoku.size}>
                <Grid
                    sudoku={sudoku}
                    moves={combineAllMoves(existingMoves, sudoku.size)}
                    activeCell={activeCell}
                    setActiveCell={setActiveCell}
                />
            </SudokuSizeContext.Provider>
            <div className={"control-panel"}>
                <NumberInputPanel />
            </div>
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
