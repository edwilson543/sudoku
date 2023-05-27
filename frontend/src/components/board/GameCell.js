export default function GameCell({move}) {
    /**
     * A cell that the user must fill in as part of the game.
     * It may or may not already have a value from an existing move.
     *
     * @property value: A move object (has a `value` and `is_correct` value).
    */
    return (
        <div className={"cell"}>
            {move ? move.value : ''}
        </div>
    );
}
