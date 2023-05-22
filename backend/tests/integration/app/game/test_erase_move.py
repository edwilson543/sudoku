# Third party imports
import pytest

# Local application imports
from app import game
from tests import factories


@pytest.mark.django_db
class TestEraseMove:
    def test_erases_move(self):
        move = factories.Move(is_erased=True)

        game.erase_move(move=move)

        assert move.is_erased
