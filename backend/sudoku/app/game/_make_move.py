# Django imports
from django.db import IntegrityError, transaction

# Local application imports
from data import models


class MoveNumberAlreadyExists(IntegrityError):
    pass


@transaction.atomic
def make_move(
    *, game: models.Game, number_in_game: int, row: int, column: int, value: int | None
) -> models.Move:
    """
    Record a new move in a game of sudoku.

    This can be:
    * Writing an integer value into a cell
    * Clearing the value in a cell by recording the value as `None`
    """
    try:
        return game.make_move(
            number_in_game=number_in_game, row=row, column=column, value=value
        )
    except IntegrityError:
        raise MoveNumberAlreadyExists
