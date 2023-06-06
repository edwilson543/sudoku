# Local application imports
from data import models

MoveDoesNotExist = models.Move.DoesNotExist


def undo_move(*, game: models.Game, number_in_game: int) -> None:
    """
    Undo a move in the game (but maintain a record that it existed).

    :raises MoveDoesNotExist: If the move does not exist in the game.
    """
    move = game.moves.get(number_in_game=number_in_game)
    move.undo()
