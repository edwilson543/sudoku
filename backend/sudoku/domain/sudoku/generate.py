# Standard library imports
import dataclasses
import math
import random
import time

# Local application imports
from data import constants
from domain.sudoku import constants as sudoku_constants
from domain.sudoku import solve


class SudokuGenerationTimeout(TimeoutError):
    pass


class SudokuDifficultyAndOrSizeNotSupported(NotImplementedError):
    def __init__(
        self, difficulty: constants.SudokuDifficulty, size: constants.SudokuSize
    ) -> None:
        super().__init__(
            f"Sudokus of size {size} and difficulty {difficulty} are not currently supported.",
            size,
            difficulty,
        )


@dataclasses.dataclass(frozen=True)
class Sudoku:
    problem: list[list[int | None]]
    solution: list[list[int]]
    size: constants.SudokuSize
    difficulty: constants.SudokuDifficulty
    number_of_missing_values: int


def generate_sudoku(
    *,
    difficulty: constants.SudokuDifficulty,
    size: constants.SudokuSize,
    timeout_seconds: int = sudoku_constants.GENERATION_TIMEOUT_SECONDS,
) -> Sudoku:
    """
    Generate a new `Sudoku` for the given size and difficulty.

    :raises SudokuGenerationTimeout: If no problem could be found within the set threshold.
    :raises SudokuDifficultyAndOrSizeNotSupported: If the given difficulty and or size is not supported.
    """
    solution = _get_solved_sudoku_for_size(size)
    shuffled_solution = _shuffle(solution)

    number_of_values_to_remove = _get_number_of_clues_to_remove(
        difficulty=difficulty, size=size
    )

    start_time = time.perf_counter()
    while True:
        try:
            problem = _create_problem_from_solution(
                solution=shuffled_solution,
                number_of_values_to_remove=number_of_values_to_remove,
                size=size,
            )
            break
        except (solve.SudokuSolutionIsNotUnique, solve.SudokuSolutionNotFound):
            if (timeout_seconds is not None) and (
                time.perf_counter() - start_time > timeout_seconds
            ):
                raise SudokuGenerationTimeout

    return Sudoku(
        problem=problem,
        solution=solution,
        size=size,
        difficulty=difficulty,
        number_of_missing_values=number_of_values_to_remove,
    )


def _get_solved_sudoku_for_size(size: constants.SudokuSize) -> list[list[int]]:
    """
    Get a valid sudoku solution for the given size.
    """
    problem = [[None for _ in range(0, size)] for _ in range(0, size)]
    # mypy doesn't like the rows of `None`, when the solver expects rows of `int | None`
    return solve.solve_sudoku(problem, validate_unique=False)  # type: ignore[arg-type]


def _shuffle(solution: list[list[int]]) -> list[list[int]]:
    """
    Shuffle the solution to create a new sudoku.

    For a size 9 sudoku:
    - Reorder rows 0-3, 3-6, 6-9
    - Transpose (so that the columns become rows)
    - Reorder rows 0-3, 3-6, 6-9
    """

    sudoku_size = len(solution)
    sudoku_rank = int(math.sqrt(sudoku_size))

    def shuffle_rows(solution_copy: list[list[int]]) -> list[list[int]]:
        # Collect the rows into groups that can be shuffled without invalidating the solution
        tile_rows = [
            solution_copy[n : (n + sudoku_rank)]
            for n in range(0, sudoku_size, sudoku_rank)
        ]

        # Shuffle the rows within each tile (but across the columns)
        [random.shuffle(rows_to_shuffle) for rows_to_shuffle in tile_rows]

        # Reconstruct the solution as a list of lists
        return [row for rows_to_shuffle in tile_rows for row in rows_to_shuffle]

    def transpose(solution_copy: list[list[int]]) -> list[list[int]]:
        """
        Flip the solution diagonally so that the columns become rows.
        """
        return [[row[n] for row in solution_copy] for n in range(0, sudoku_size)]

    shuffled_rows = shuffle_rows(solution)
    transposed = transpose(shuffled_rows)
    shuffled_cols = shuffle_rows(transposed)
    return shuffled_cols


def _create_problem_from_solution(
    solution: list[list[int]],
    number_of_values_to_remove: int,
    size: constants.SudokuSize,
) -> list[list[int | None]]:
    """
    Create a sudoku problem from the solution by removing some clues.
    """
    # Randomly generate some cell indexes of the solution to set to None
    indexes_to_remove = random.sample(
        population=range(0, size**2), k=number_of_values_to_remove
    )
    # Construct a problem with `None` swapped in for any of the `indexes_to_remove`
    problem = [
        [
            value if (col_number + row_number * size not in indexes_to_remove) else None
            for col_number, value in enumerate(row)
        ]
        for row_number, row in enumerate(solution)
    ]
    # Ensure the problem has a unique solution
    solve.solve_sudoku(problem, validate_unique=True)
    return problem


def _get_number_of_clues_to_remove(
    difficulty: constants.SudokuDifficulty, size: constants.SudokuSize
) -> int:
    try:
        number_of_clues = sudoku_constants.NUMBER_OF_CLUES_FOR_SIZE[size][difficulty]
    except KeyError:
        raise SudokuDifficultyAndOrSizeNotSupported(difficulty=difficulty, size=size)
    return (size**2) - number_of_clues
