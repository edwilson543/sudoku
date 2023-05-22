# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestMakeMove:
    def tests_makes_correct_move_and_erases_existing_move_in_cell(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        existing_move = factories.Move(game=sudoku_game, row=0, column=0)

        move = game.make_move(game=sudoku_game, row=0, column=0, value=1)

        # Check the expected move was made
        assert move.is_correct
        assert move.game == sudoku_game
        assert move.row == 0
        assert move.column == 0
        assert move.value == 1

        # Check the existing move was erased
        existing_move.refresh_from_db()
        assert existing_move.is_erased

    def test_makes_incorrect_move_and_erases_existing_move_in_cell(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        existing_move = factories.Move(game=sudoku_game, row=0, column=0)

        move = game.make_move(game=sudoku_game, row=0, column=0, value=0)

        # Check the expected move was made
        assert not move.is_correct
        assert move.game == sudoku_game
        assert move.row == 0
        assert move.column == 0
        assert move.value == 0

        # Check the existing move was erased
        existing_move.refresh_from_db()
        assert existing_move.is_erased

    def test_makes_correct_move_in_empty_cell(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        move = game.make_move(game=sudoku_game, row=0, column=0, value=1)

        # Check the expected move was made
        assert move.is_correct
        assert move.game == sudoku_game
        assert move.row == 0
        assert move.column == 0
        assert move.value == 1
