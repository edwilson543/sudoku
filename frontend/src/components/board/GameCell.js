import {useContext} from "react";

import {SudokuSizeContext} from "../SudokuSizeConext";
import {getTileIndex} from "../../utils/gemoetry";


export default function GameCell({move, activeCell, setActiveCell, rowIndex, columnIndex}) {
    /**
     * A cell that the user must fill in as part of the game.
     * It may or may not already have a value from an existing move.
     *
     * @property value: A move object (has a `value` and `is_correct` value).
     */
    const sudokuSize = useContext(SudokuSizeContext);
    const tileIndex = getTileIndex(rowIndex, columnIndex, sudokuSize);

    function handleClick() {
        setActiveCell({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            tileIndex: tileIndex,
            value: move,
            isGameCell: true
        })
    }

    function getClassName() {
        let className = "cell game-cell";
        if (activeCell.rowIndex === rowIndex &&
            activeCell.columnIndex === columnIndex
        ) {
            className += " active-cell";
        } else if (activeCell.rowIndex === rowIndex ||
            activeCell.columnIndex === columnIndex ||
            activeCell.tileIndex === tileIndex
        ) {
            className += " highlighted-cell";
        } else if (activeCell.value === move && move !== null) {
            className += " highlighted-cell-value";
        }
        return className;
    }

    return (
        <div className={getClassName()} onClick={handleClick}>
            {move ? move.value : ''}
        </div>
    );
}
