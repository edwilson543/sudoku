# Local application imports
from data import constants, models
from domain.game import queries


def terminate_game(*, game: models.Game) -> None:
    """
    Mark a game as terminated, and set the appropriate status.
    """
    current_board_state = queries.get_board_state(game=game)
    sudoku_is_solved = current_board_state == game.sudoku.solution
    at_least_one_error = game.moves.count() > game.sudoku.number_of_missing_values

    if sudoku_is_solved and not at_least_one_error:
        status = constants.GameStatus.COMPLETE_NO_ERRORS
    elif sudoku_is_solved and at_least_one_error:
        status = constants.GameStatus.COMPLETE_WITH_ERRORS
    else:
        status = constants.GameStatus.INCOMPLETE_DISCARDED

    # Mypy thinks status is a `str` rather than `GameStatus`
    game.update_status(status=status)  # type: ignore[arg-type]
