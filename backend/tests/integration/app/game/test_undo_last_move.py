# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestUndoLastMove:
    def test_undoes_last_move(self):
        game_ = factories.Game()
        move = factories.Move(game=game_, is_undone=False, number_in_game=1)
        last_move = factories.Move(game=game_, is_undone=False, number_in_game=2)

        game.undo_last_move(game=game_)

        last_move.refresh_from_db()
        assert last_move.is_undone
        move.refresh_from_db()
        assert not move.is_undone

    def test_undoes_second_last_move_when_last_move_already_undone(self):
        game_ = factories.Game()
        second_last_move = factories.Move(game=game_, is_undone=False, number_in_game=1)
        # Make an undone move since the second last move
        factories.Move(game=game_, is_undone=True, number_in_game=2)

        game.undo_last_move(game=game_)

        second_last_move.refresh_from_db()
        assert second_last_move.is_undone

    def test_raises_when_game_has_no_moves(self):
        game_ = factories.Game()

        with pytest.raises(game.MoveDoesNotExist):
            game.undo_last_move(game=game_)
