# Local application imports
from data import models


def erase_move(*, move: models.Move) -> None:
    """
    Erase a single move from the game (but maintain a record that it existed).

    This is called when:
    * The user realised they made a mistake and wants to retract the remove
    * The user wants to make a new move in the occupied cell
    """
    move.erase()
