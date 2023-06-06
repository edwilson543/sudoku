# Local application imports
from data import models


class MoveDoesNotExist(Exception):
    pass


def undo_last_move(*, game: models.Game) -> None:
    """
    Undo the last move in the game (but maintain a record that it existed).

    Note this will undo the most recent move that hasn't already been undone.
    """
    last_move = game.moves.filter(is_undone=False).order_by("number_in_game").last()
    if last_move:
        last_move.undo()
    else:
        raise MoveDoesNotExist
