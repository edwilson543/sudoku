# Local application imports
from data import models


def erase_all_incorrect_moves(*, game: models.Game) -> models.Game:
    """
    Erase all moves in a game that are not correct.

    This is called when performing game wide validation, for example
    when the board gets full.
    """
    invalid_moves = game.moves.filter(is_correct=False, is_erased=False)
    for move in invalid_moves:
        move.is_erased = True
    models.Move.objects.bulk_update(invalid_moves, fields=["is_erased"])
    return game
