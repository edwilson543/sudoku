# Django imports
from django.db import models as django_models


class SudokuDifficulty(django_models.TextChoices):
    EASY = "EASY", "Easy"
    MEDIUM = "MEDIUM", "Medium"
    HARD = "HARD", "Hard"


class SudokuSize(django_models.IntegerChoices):
    ONE = 1
    FOUR = 4
    NINE = 9


class GameStatus(django_models.TextChoices):
    # The player is currently (i.e. whenever on the site) playing this sudoku
    ACTIVE = "ACTIVE"

    # The player completed the sudoku with no incorrect moves
    COMPLETE_NO_ERRORS = "COMPLETE_NO_ERRORS"

    # The player eventually completed the sudoku with at least one incorrect move
    COMPLETE_WITH_ERRORS = "COMPLETE_WITH_ERRORS"

    # The player asked to be given a new sudoku
    INCOMPLETE_DISCARDED = "INCOMPLETE_DISCARDED"
