from __future__ import annotations

# Standard library imports
import datetime as dt
from typing import TYPE_CHECKING

# Django imports
from django.db import models as django_models

# Local application imports
from data import constants

if TYPE_CHECKING:
    # Local application imports
    from data.models import _move, _player, _sudoku


class Game(django_models.Model):
    """
    A game linking a player and a specific sudoku problem.
    """

    player = django_models.ForeignKey(
        "Player", on_delete=django_models.CASCADE, related_name="games"
    )
    """
    The player that this game was created for.
    """

    sudoku = django_models.ForeignKey(
        "Sudoku", on_delete=django_models.PROTECT, related_name="games"
    )
    """
    A sudoku the player is at some stage of completing.
    """

    status = django_models.CharField(
        choices=constants.GameStatus.choices, max_length=64
    )
    """
    The player's progress in completing this sudoku.
    """

    started_at = django_models.DateTimeField(auto_now_add=True)
    """
    When the player was first shown this sudoku.
    """

    ended_at = django_models.DateTimeField(null=True)
    """
    When the player completed or discarded this game.
    """

    moves: django_models.QuerySet[_move.Move]

    # ----------
    # Factories
    # ----------

    @classmethod
    def create_new(cls, *, player: _player.Player, sudoku: _sudoku.Sudoku) -> Game:
        return cls.objects.create(
            player=player, sudoku=sudoku, status=constants.GameStatus.ACTIVE
        )

    # ----------
    # Mutators
    # ----------

    def make_move(self, *, row: int, column: int, value: int | None) -> _move.Move:
        return self.moves.create(row=row, column=column, value=value)

    def update_status(self, status: constants.GameStatus) -> None:
        self.status = status
        self.ended_at = dt.datetime.now()
        self.save(update_fields=["status", "ended_at"])
