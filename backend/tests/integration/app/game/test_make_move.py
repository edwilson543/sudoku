# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestMakeMove:
    @pytest.mark.parametrize("is_correct", [True, False])
    def tests_makes_new_move_and_records_as_correct(self, is_correct: bool):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        value = is_correct * 1
        move = game.make_move(game=sudoku_game, row=0, column=0, value=value)

        # Check the expected move was made
        assert move.is_correct is is_correct
        assert move.game == sudoku_game
        assert move.row == 0
        assert move.column == 0
        assert move.value == value

    def test_makes_empty_move(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        move = game.make_move(game=sudoku_game, row=0, column=0, value=None)

        # Check the expected move was made
        assert not move.is_correct

        assert move.game == sudoku_game
        assert move.row == 0
        assert move.column == 0
        assert move.value is None
