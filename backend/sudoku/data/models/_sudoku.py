from __future__ import annotations

# Django imports
from django.db import models as django_models

# Local application imports
from data import constants


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

    difficulty = django_models.CharField(
        choices=constants.SudokuDifficulty.choices, max_length=64
    )
    """
    Rough difficulty of the sudoku based on the number of missing values.
    """

    size = django_models.PositiveIntegerField()
    """
    The size of this sudoku.

    Size is defined as the number of cells per row / column / tile,
    which is `9` for the bog standard sudoku.
    To keep it simple, we only allow square sudokus.
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
    # Factories
    # ----------

    @classmethod
    def create_new(
        cls,
        *,
        problem: list[list[int | None]],
        solution: list[list[int]],
        difficulty: constants.SudokuDifficulty,
        size: constants.SudokuSize,
        number_of_missing_values: int,
    ) -> Sudoku:
        return cls.objects.create(
            problem=problem,
            solution=solution,
            difficulty=difficulty,
            size=size,
            number_of_missing_values=number_of_missing_values,
        )

    # ----------
    # Queries
    # ----------

    def move_is_correct(self, *, row: int, column: int, value: int) -> bool:
        return self.solution[row][column] == value
