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

    value = django_models.PositiveIntegerField()
    """
    The value of the sudoku move.
    """

    is_correct = django_models.BooleanField()
    """
    Whether the move is correct or incorrect.

    This is derivable, but is added for convenience.
    """

    is_erased = django_models.BooleanField(default=False)
    """
    Whether this move has been erased by the user since it was made.
    """

    made_at = django_models.DateTimeField(auto_now_add=True)
    """
    When the move was made.
    """

    # ----------
    # Mutators
    # ----------

    def erase(self) -> None:
        self.is_erased = True
        self.save(update_fields=["is_erased"])
