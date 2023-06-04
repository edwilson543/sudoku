from __future__ import annotations

# Django imports
from django.db import models as django_models


class Move(django_models.Model):
    """
    Record an attempt at inserting the correct value into a game of sudoku.
    """

    game = django_models.ForeignKey(
        "Game", on_delete=django_models.CASCADE, related_name="moves"
    )
    """
    The game this move was made as part of.
    """

    row = django_models.PositiveIntegerField()
    """
    The row of the sudoku the move was made in.
    """

    column = django_models.PositiveIntegerField()
    """
    The column of the sudoku the move was made in.
    """

    value = django_models.PositiveIntegerField(null=True)
    """
    The value of the sudoku move.

    When value is `null`, this represents clearing any existing value in that cell.
    """

    is_undone = django_models.BooleanField(default=False)
    """
    Whether the move has been `undone` from the game.

    Note we can undo moves with and without a value.
    """

    made_at = django_models.DateTimeField(auto_now_add=True)
    """
    When the move was made.
    """

    # ----------
    # Mutators
    # ----------

    def undo(self) -> None:
        self.is_undone = True
        self.save(update_fields=["is_undone"])
