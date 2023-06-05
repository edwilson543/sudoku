# Third party imports
import factory
from factory import django as factory_django

# Local application imports
from data import constants, models


def sudoku_problem() -> list[list[int | None]]:
    """
    A sudoku problem statement.
    """
    return [
        [9, None, None, 5, None, None, None, None, None],
        [6, 8, 7, 3, 4, None, None, 5, None],
        [None, None, 4, 1, None, 7, None, 3, None],
        [None, 4, None, None, 2, 6, None, None, 8],
        [None, 2, 6, None, 5, 1, 4, 9, None],
        [None, 9, 1, 4, None, 3, None, 6, 2],
        [None, None, 2, 7, None, None, 9, None, 5],
        [None, None, None, None, None, None, 3, None, 1],
        [5, None, None, None, None, 9, 6, None, 7],
    ]


def sudoku_solution() -> list[list[int | None]]:
    """
    The solution for `sudoku_problem`.
    """
    return [
        [9, 1, 3, 5, 6, 8, 2, 7, 4],
        [6, 8, 7, 3, 4, 2, 1, 5, 9],
        [2, 5, 4, 1, 9, 7, 8, 3, 6],
        [3, 4, 5, 9, 2, 6, 7, 1, 8],
        [7, 2, 6, 8, 5, 1, 4, 9, 3],
        [8, 9, 1, 4, 7, 3, 5, 6, 2],
        [1, 6, 2, 7, 3, 4, 9, 8, 5],
        [4, 7, 9, 6, 8, 5, 3, 2, 1],
        [5, 3, 8, 2, 1, 9, 6, 4, 7],
    ]


class Sudoku(factory_django.DjangoModelFactory):
    problem = factory.LazyFunction(sudoku_problem)
    solution = factory.LazyFunction(sudoku_solution)
    size = constants.SudokuSize.NINE
    difficulty = constants.SudokuDifficulty.MEDIUM
    number_of_missing_values = 36

    class Meta:
        model = models.Sudoku


class Player(factory_django.DjangoModelFactory):
    ip_address = factory.Sequence(lambda n: f"ip-address-{n}")

    class Meta:
        model = models.Player


class Game(factory_django.DjangoModelFactory):
    player = factory.SubFactory(Player)
    sudoku = factory.SubFactory(Sudoku)
    status = constants.GameStatus.ACTIVE

    class Meta:
        model = models.Game


class Move(factory_django.DjangoModelFactory):
    game = factory.SubFactory(Game)
    number_in_game = factory.Sequence(lambda n: n)
    row = factory.Sequence(lambda n: n)
    column = factory.Sequence(lambda n: n)
    value = factory.Sequence(lambda n: n)
    is_undone = False

    class Meta:
        model = models.Move
