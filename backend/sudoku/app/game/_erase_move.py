# Local application imports
from data import models
from domain.game import queries


class MoveDoesNotExist(Exception):
    pass


def erase_move(*, game: models.Game, row: int, column: int) -> None:
    """
    Erase a single move from the game (but maintain a record that it existed).

    This is called when:
    * The user realised they made a mistake and wants to retract the remove
    * The user wants to make a new move in the occupied cell
    """
    if not (move := queries.get_non_erased_move(game=game, row=row, column=column)):
        raise MoveDoesNotExist
    move.erase()
