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

        game.undo_move(game=game_, number_in_game=2)

        last_move.refresh_from_db()
        assert last_move.is_undone
        move.refresh_from_db()
        assert not move.is_undone

    def test_undoes_second_last_move_when_specified(self):
        game_ = factories.Game()
        move = factories.Move(game=game_, is_undone=False, number_in_game=1)
        last_move = factories.Move(game=game_, is_undone=False, number_in_game=2)

        game.undo_move(game=game_, number_in_game=1)

        last_move.refresh_from_db()
        assert not last_move.is_undone
        move.refresh_from_db()
        assert move.is_undone

    def test_raises_when_move_does_not_exist(self):
        game_ = factories.Game()

        with pytest.raises(game.MoveDoesNotExist):
            game.undo_move(game=game_, number_in_game=1)
