# Third party imports
import pytest

# Django imports
from django.db import IntegrityError

# Local application imports
from tests import factories


@pytest.mark.django_db
class TestMoveDatabaseConstraints:
    def test_raises_integrity_error_if_number_in_game_already_exists(self):
        game = factories.Game()
        move = factories.Move(game=game)

        with pytest.raises(IntegrityError):
            factories.Move(game=game, number_in_game=move.number_in_game)

    def test_unique_number_in_game_valid(self):
        game = factories.Game()
        factories.Move(game=game, number_in_game=1)
        factories.Move(game=game, number_in_game=2)
