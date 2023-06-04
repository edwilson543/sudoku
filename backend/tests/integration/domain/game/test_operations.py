# Third party imports
import pytest

# Local application imports
from data import constants
from domain.game import operations
from tests import factories


@pytest.mark.django_db
class TestTerminateGame:
    def test_sets_game_status_to_complete_no_errors(self):
        sudoku = factories.Sudoku(problem=[[None]], solution=[[1]])
        game = factories.Game(sudoku=sudoku, status=constants.GameStatus.ACTIVE)
        factories.Move(game=game, row=0, column=0, value=1, is_undone=False)

        operations.terminate_game(game=game)

        assert game.status == constants.GameStatus.COMPLETE_NO_ERRORS

    def test_sets_game_status_to_complete_with_errors(self):
        sudoku = factories.Sudoku(
            problem=[[None]], solution=[[1]], number_of_missing_values=1
        )
        game = factories.Game(sudoku=sudoku, status=constants.GameStatus.ACTIVE)

        # First make the wrong move, then make the right move
        factories.Move(game=game, row=0, column=0, value=0, is_undone=False)
        factories.Move(game=game, row=0, column=0, value=1, is_undone=False)

        operations.terminate_game(game=game)

        assert game.status == constants.GameStatus.COMPLETE_WITH_ERRORS

    def test_sets_game_status_to_incomplete_discarded(self):
        sudoku = factories.Sudoku(number_of_missing_values=1)
        game = factories.Game(sudoku=sudoku, status=constants.GameStatus.ACTIVE)

        operations.terminate_game(game=game)

        assert game.status == constants.GameStatus.INCOMPLETE_DISCARDED
