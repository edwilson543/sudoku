import {useContext} from 'react';

import {SudokuSizeContext} from "../SudokuSizeConext";
import NumberInput from "./NumberInput";


export default function NumberInputPanel() {
    const sudokuSize = useContext(SudokuSizeContext);
    const numbers = [...Array(sudokuSize).keys()].map(i => i + 1)

    return (
        <div className={"number-input-panel"}>
            {
                numbers.map((number) => {
                    return <NumberInput value={number}/>;
                })}
        </div>
    );
}
