# Django imports
from django.db import transaction

# Local application imports
from data import models


@transaction.atomic
def make_move(
    *, game: models.Game, row: int, column: int, value: int | None
) -> models.Move:
    """
    Record a new move in a game of sudoku.

    This can be:
    * Writing an integer value into a cell
    * Clearing the value in a cell by recording the value as `None`
    """
    is_correct = game.sudoku.move_is_correct(row=row, column=column, value=value)

    return game.make_move(row=row, column=column, value=value, is_correct=is_correct)
