# Standard library imports
import copy

# Local application imports
from data import constants, models


def get_active_game_for_player(*, player: models.Player) -> models.Game | None:
    """
    Get the game this player is currently playing.
    """
    try:
        return models.Game.objects.get(
            player=player, status=constants.GameStatus.ACTIVE
        )
    except models.Game.DoesNotExist:
        return None


def get_board_state(*, game: models.Game) -> list[list[int | None]]:
    """
    Construct the current board state based on the player's moves and the sudoku problem.
    """
    board = copy.deepcopy(game.sudoku.problem)
    for move in game.moves.filter(is_undone=False).order_by("made_at"):
        board[move.row][move.column] = move.value
    return board
