import {useContext} from "react";
import {SudokuSizeContext} from "../SudokuSizeConext";
import {getTileIndex} from "../../utils/gemoetry";

export default function ClueCell({value, activeCell, setActiveCell, rowIndex, columnIndex}) {
    /**
     * A static cell that is given as a clue at the start of the game.
     *
     * @property value: The integer to render inside this cell.
     */
    const sudokuSize = useContext(SudokuSizeContext);
    const tileIndex = getTileIndex(rowIndex, columnIndex, sudokuSize);

    function handleClick() {
        setActiveCell({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            tileIndex: tileIndex,
            value: value,
            isGameCell: true
        })
    }

    function getClassName() {
        let className = "cell";
        if (activeCell.rowIndex === rowIndex &&
            activeCell.columnIndex === columnIndex
        ) {
            className += " active-cell";
        } else if (activeCell.rowIndex === rowIndex ||
            activeCell.columnIndex === columnIndex ||
            activeCell.tileIndex === tileIndex
        ) {
            className += " highlighted-cell";
        } else if (activeCell.value === value) {
            className += " highlighted-cell-value";
        }
        return className;
    }

    return (
        <div className={getClassName()} onClick={handleClick}>
            {value}
        </div>
    );
}
