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

    number_in_game = django_models.PositiveIntegerField()
    """
    Official record of the order of moves in the game.

    This is to:
    - Maintain an ordered game history. `created_at` may not be accurate, for
      example if requests get delayed
    - Act as an idempotency key when recording moves posted from the frontend
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

    class Meta:
        constraints = [
            django_models.UniqueConstraint(
                "game", "number_in_game", name="move_number_in_game_unique"
            )
        ]

    def __str__(self) -> str:
        return f"Move #{self.number_in_game} in game #{self.game.id}"

    # ----------
    # Mutators
    # ----------

    def undo(self) -> None:
        self.is_undone = True
        self.save(update_fields=["is_undone"])
