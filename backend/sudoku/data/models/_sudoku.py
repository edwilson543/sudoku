from __future__ import annotations

# Third party imports
from data import constants

# Django imports
from django.db import models as django_models


class Sudoku(django_models.Model):
    """
    Representation of a sudoku problem.
    """

    problem = django_models.JSONField()
    """
    Representation of the unsolved sudoku, as a list of the rows.

    Integers represent the clues, `null` represents the missing values.
    """

    solution = django_models.JSONField()
    """
    Representation of the solved sudoku, as a list of the rows.

    Integers specify every value, and there are no `null` values in the list.
    """

    size = django_models.PositiveIntegerField()
    """
    The size of this sudoku.

    Size is defined as the number of cells per row / column / tile,
    which is `9` for the bog standard sudoku.
    To keep it simple, we only allow square sudokus.
    """

    difficulty = django_models.CharField(
        choices=constants.SudokuDifficulty.choices, max_length=64
    )
    """
    Rough difficulty of the sudoku based on the number of missing values.
    """

    number_of_missing_values = django_models.PositiveIntegerField()
    """
    The number of values in `solution` that are not in `problem`.

    This is derivable, but is added for convenience.
    """

    created_at = django_models.DateTimeField(auto_now_add=True)
    """
    When the sudoku was first created.
    """

    # ----------
    # Queries
    # ----------

    def move_is_correct(self, *, row: int, column: int, value: int) -> bool:
        return self.solution[row][column] == value
