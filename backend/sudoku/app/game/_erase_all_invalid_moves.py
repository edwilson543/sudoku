# Local application imports
from data import models


def erase_all_invalid_moves(*, game: models.Game) -> models.Game:
    """
    - Erase all invalid moves in a game
    invalid_moves = game.moves.filter(is_correct=False)
    TODO once instant validation mode working.
    """
    pass
