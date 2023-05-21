# Local application imports
from data import constants, models
from domain.sudoku import generate


class UnableToCreateSudoku(generate.SudokuGenerationTimeout):
    pass


def create_new_sudoku(
    *, difficulty: constants.SudokuDifficulty, size: int
) -> models.Sudoku:
    """
    Create a new sudoku in the db of the given difficulty and size.

    :raises UnableToCreateSudoku: If sudoku generation timed out.
    """
    try:
        sudoku = generate.generate_sudoku(difficulty=difficulty, size=size)
    except generate.SudokuGenerationTimeout:
        raise UnableToCreateSudoku

    return models.Sudoku.create_new(
        problem=sudoku.problem,
        solution=sudoku.solution,
        number_of_missing_values=sudoku.number_of_missing_values,
        difficulty=difficulty,
        size=size,
    )
