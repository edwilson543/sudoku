# Django imports
from django.db import transaction

# Local application imports
from app.game import _erase_move
from data import models
from domain.game import queries as game_queries


@transaction.atomic
def make_move(*, game: models.Game, row: int, column: int, value: int) -> models.Move:
    """
    Record an attempt at inserting the correct value in a game of sudoku.

    :raises MoveAlreadyExists: If a non-erased move already exists in the given cell.
    """
    if existing_move := game_queries.get_non_erased_move(game, row=row, column=column):
        _erase_move.erase_move(move=existing_move)

    is_correct = game.sudoku.move_is_correct(row=row, column=column, value=value)

    return game.make_move(row=row, column=column, value=value, is_correct=is_correct)
