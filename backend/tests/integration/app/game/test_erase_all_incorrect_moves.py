# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestEraseAllIncorrectMoves:
    def test_erases_incorrect_moves_but_leaves_correct_ones(self):
        sudoku_game = factories.Game()

        incorrect_move = factories.Move(
            game=sudoku_game, is_correct=False, is_erased=False
        )
        correct_move = factories.Move(
            game=sudoku_game, is_correct=True, is_erased=False
        )

        game.erase_all_incorrect_moves(game=sudoku_game)

        incorrect_move.refresh_from_db()
        assert incorrect_move.is_erased
        assert not correct_move.is_erased
