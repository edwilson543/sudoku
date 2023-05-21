# Django imports
from django.db import models as django_models

# Local application imports
from data import constants, models


def get_unattempted_sudokus_for_player(
    *, player: models.Player, difficulty: constants.SudokuDifficulty, size: int
) -> django_models.QuerySet[models.Sudoku]:
    """
    Get the sudokus of the given difficulty and size this player has not attempted.
    """
    return (
        models.Sudoku.objects.exclude(games__player=player)
        .filter(difficulty=difficulty, size=size)
        .order_by("created_at")
    )
