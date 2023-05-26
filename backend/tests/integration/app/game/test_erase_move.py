# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestEraseMove:
    def test_erases_move_when_move_exists(self):
        game_ = factories.Game()
        move = factories.Move(game=game_, is_erased=False)

        game.erase_move(game=game_, row=move.row, column=move.column)

        move.refresh_from_db()
        assert move.is_erased

    def test_raises_when_move_does_not_exist(self):
        game_ = factories.Game()
        move = factories.Move(game=game_, is_erased=False, row=0)

        with pytest.raises(game.MoveDoesNotExist):
            game.erase_move(game=game_, row=1, column=move.column)
