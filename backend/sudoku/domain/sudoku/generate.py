# Standard library imports
import dataclasses

# Local application imports
from data import constants


@dataclasses.dataclass(frozen=True)
class Sudoku:
    problem: list[list[int]]
    solution: list[list[int | None]]
    size: int
    difficulty: constants.SudokuDifficulty
    number_of_missing_values: int


def generate_sudoku(difficulty: constants.SudokuDifficulty, size: int) -> Sudoku:
    pass


def _get_solved_sudoku_for_size(size: int) -> list[list[int]]:
    """
    # TODO
    """
    pass


def _shuffle(solution: list[list[int]]) -> list[list[int | None]]:
    """
    Shuffle -> should only need to shuffle rows within tiles, and columns within tiles.
    """


def _remove_values(solution: list[list[int]]) -> list[list[int | None]]:
    """
    should be able to do this at random until we get a unique solution,
    can do some trial and error
    """
    pass


def _transpose(solution: list[list[int]]) -> list[list[int]]:
    return [[row[n] for row in solution] for n in range(0, len(solution))]
