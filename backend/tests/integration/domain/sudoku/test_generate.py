# Standard library imports
import random

# Third party imports
import pytest

# Local application imports
from data import constants
from domain.sudoku import constants as sudoku_constants
from domain.sudoku import generate


class TestGenerate:
    @pytest.mark.parametrize(
        "difficulty",
        [
            constants.SudokuDifficulty.EASY,
            constants.SudokuDifficulty.MEDIUM,
            constants.SudokuDifficulty.HARD,
        ],
    )
    @pytest.mark.parametrize(
        "size", [constants.SudokuSize.FOUR, constants.SudokuSize.NINE]
    )
    def test_generates_sudoku_for_supported_sizes_and_difficulties(
        self, difficulty: constants.SudokuDifficulty, size: constants.SudokuSize
    ):
        # Set the random seed such that the generation loop never has to retry.
        # This value was found by trial and error
        random.seed(5)

        sudoku = generate.generate_sudoku(difficulty=difficulty, size=size)

        assert sudoku.difficulty == difficulty
        assert sudoku.size == size

        expected_missing_values = (
            size**2 - sudoku_constants.NUMBER_OF_CLUES_FOR_SIZE[size][difficulty]
        )
        actual_missing_values = sum(
            1 if value is None else 0 for row in sudoku.problem for value in row
        )
        assert (
            sudoku.number_of_missing_values
            == expected_missing_values
            == actual_missing_values
        )
        assert not any(None in row for row in sudoku.solution)

    def test_timeout_raised_when_sudoku_not_found(self):
        # Set the random seed such that the first generation attempt is invalid
        random.seed(0)

        with pytest.raises(generate.SudokuGenerationTimeout):
            generate.generate_sudoku(
                difficulty=constants.SudokuDifficulty.HARD,
                size=constants.SudokuSize.NINE,
                timeout_seconds=0,
            )

    @pytest.mark.parametrize(
        "difficulty, size",
        [
            (constants.SudokuDifficulty.EASY, 3),
            ("Non existent difficulty", 4),
            ("Non existent difficulty", 7),
        ],
    )
    def test_raises_not_implemented_error_for_unsupported_size_and_difficulty(
        self, difficulty: constants.SudokuDifficulty, size: constants.SudokuSize
    ):
        with pytest.raises(generate.SudokuDifficultyAndOrSizeNotSupported):
            generate.generate_sudoku(difficulty=difficulty, size=size)
