# Local application imports
from data import constants, models


def terminate_game(*, game: models.Game) -> None:
    """
    Mark a game as terminated, and set the appropriate status.
    """
    is_correct = (
        game.moves.filter(is_correct=True).count()
        == game.sudoku.number_of_missing_values
    )
    at_least_one_error = game.moves.filter(is_correct=False).count() > 0

    if is_correct and not at_least_one_error:
        status = constants.GameStatus.COMPLETE_NO_ERRORS
    elif is_correct and at_least_one_error:
        status = constants.GameStatus.COMPLETE_WITH_ERRORS
    else:
        status = constants.GameStatus.INCOMPLETE_DISCARDED

    # Mypy thinks status is a `str` rather than `GameStatus`
    game.update_status(status=status)  # type: ignore[arg-type]
