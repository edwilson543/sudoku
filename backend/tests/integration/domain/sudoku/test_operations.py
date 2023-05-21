# Standard library imports
import random

# Third party imports
import pytest

# Local application imports
from data import constants, models
from domain.sudoku import constants as sudoku_constants
from domain.sudoku import operations


@pytest.mark.django_db
class TestCreateNewSudoku:
    def test_can_create_new_sudoku(self):
        # Fix the random seed, so we know what sudoku to expect
        random.seed(5)

        operations.create_new_sudoku(difficulty=constants.SudokuDifficulty.EASY, size=4)

        # Ensure the relevant db content was created
        sudoku = models.Sudoku.objects.get()

        assert sudoku.problem == [
            [None, 1, 4, 3],
            [3, 4, 2, None],
            [1, 2, None, 4],
            [4, 3, 1, 2],
        ]
        assert sudoku.solution == [
            [3, 2, 1, 4],
            [4, 1, 2, 3],
            [2, 4, 3, 1],
            [1, 3, 4, 2],
        ]
        assert sudoku.difficulty == constants.SudokuDifficulty.EASY
        assert sudoku.size == 4
        assert sudoku.number_of_missing_values == 3

    def test_raises_appropriate_error_for_generation_timeout(self, monkeypatch):
        # Timeout the generator after 0 seconds (which means it gets exactly 1 attempt)
        monkeypatch.setattr(sudoku_constants, "GENERATION_TIMEOUT_SECONDS", 0)

        # Set the random seed such that the first generation attempt is invalid
        random.seed(0)

        with pytest.raises(operations.UnableToCreateSudoku):
            operations.create_new_sudoku(
                difficulty=constants.SudokuDifficulty.HARD, size=9
            )
