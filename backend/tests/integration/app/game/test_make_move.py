# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestMakeMove:
    def tests_makes_new_move_and_records_as_correct(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        move = game.make_move(
            number_in_game=1, game=sudoku_game, row=0, column=0, value=1
        )

        # Check the expected move was made
        assert move.game == sudoku_game
        assert move.number_in_game == 1
        assert move.row == 0
        assert move.column == 0
        assert move.value == 1

    def test_makes_empty_move(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)

        move = game.make_move(
            number_in_game=1, game=sudoku_game, row=0, column=0, value=None
        )

        # Check the expected move was made
        assert move.game == sudoku_game
        assert move.number_in_game == 1
        assert move.row == 0
        assert move.column == 0
        assert move.value is None

    def test_raises_if_move_number_in_game_already_exists(self):
        solution = [[1]]
        problem = [[None]]

        sudoku = factories.Sudoku(problem=problem, solution=solution)
        sudoku_game = factories.Game(sudoku=sudoku)
        # Make the first move in the game
        move = factories.Move(game=sudoku_game)

        with pytest.raises(game.MoveNumberAlreadyExists):
            game.make_move(
                number_in_game=move.number_in_game,
                game=sudoku_game,
                row=0,
                column=0,
                value=None,
            )
