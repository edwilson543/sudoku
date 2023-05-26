# Django imports
from django.db import transaction

# Local application imports
from data import constants, models
from domain.game import queries as game_queries
from domain.player import operations as player_operations
from domain.sudoku import operations as sudoku_operations


class UnableToCreateSudoku(sudoku_operations.UnableToCreateSudoku):
    pass


@transaction.atomic
def get_or_create_active_game(
    *,
    ip_address: str,
    difficulty: constants.SudokuDifficulty = constants.SudokuDifficulty.EASY,  # type: ignore[assignment]
    size: constants.SudokuSize = constants.SudokuSize.NINE,  # type: ignore[assignment]
) -> models.Game:
    """
    Get the active game associated with some ip address.

    This is the entrypoint into the sudoku game, for new and existing players.

    :raises UnableToCreateSudoku: If no existing sudokus are available
        and one could not be created.
    """
    # If the IP address isn't registered, register them as a player
    player = player_operations.get_or_create_player(ip_address=ip_address)

    # If the player has a currently active game, return it
    if active_game := game_queries.get_active_game_for_player(player=player):
        return active_game

    # Otherwise, create a new active game for the player
    else:
        try:
            unattempted_sudoku = (
                sudoku_operations.get_or_create_unattempted_sudoku_for_player(
                    player=player, difficulty=difficulty, size=size
                )
            )
        except sudoku_operations.UnableToCreateSudoku:
            raise UnableToCreateSudoku
        return models.Game.create_new(player=player, sudoku=unattempted_sudoku)
