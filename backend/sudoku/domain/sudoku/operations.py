# Local application imports
from data import constants, models
from domain.sudoku import generate, queries


class UnableToCreateSudoku(generate.SudokuGenerationTimeout):
    pass


def get_or_create_unattempted_sudoku_for_player(
    *, player: models.Player, difficulty: constants.SudokuDifficulty, size: int
) -> models.Sudoku:
    """
    Get a sudoku the player hasn't attempted, otherwise create a new one.

    :raises UnableToCreateSudoku: If sudoku generation timed out.
    """
    unattempted_sudokus = queries.get_unattempted_sudokus_for_player(
        player=player, difficulty=difficulty, size=size
    )
    if unattempted_sudoku := unattempted_sudokus.first():
        return unattempted_sudoku

    return create_new_sudoku(difficulty=difficulty, size=size)


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
