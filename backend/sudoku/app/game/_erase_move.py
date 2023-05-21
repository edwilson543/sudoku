# Local application imports
from data import models


def erase_move(*, game: models.Game, row: int, column: int, value: int) -> models.Move:
    """
    - Call get non-erased move
    - Raise a custom exception if it does not exist
    - Otherwise erase it
    """
    pass
