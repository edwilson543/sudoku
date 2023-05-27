export default function ClueCell({value}) {
    /**
     * A static cell that is given as a clue at the start of the game.
     *
     * @property value: The integer to render inside this cell.
     */
    return (
        <div class={"cell"}>
            {value}
        </div>
    );
}
