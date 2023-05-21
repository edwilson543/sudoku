# Third party imports
import pytest

# Local application imports
from data import constants
from domain.game import queries
from tests import factories


@pytest.mark.django_db
class TestGetActiveGameForPlayer:
    def test_gets_active_game_when_player_has_an_game(self):
        player = factories.Player()
        game = factories.Game(player=player, status=constants.GameStatus.ACTIVE)

        # Create an inactive game for this player
        other_player = factories.Player()
        factories.Game(
            player=other_player, status=constants.GameStatus.INCOMPLETE_DISCARDED
        )

        # Create an active game for some other player
        other_player = factories.Player()
        factories.Game(player=other_player, status=constants.GameStatus.ACTIVE)

        active_game = queries.get_active_game_for_player(player=player)

        assert active_game == game

    def test_returns_none_when_player_has_no_active_game(self):
        player = factories.Player()

        active_game = queries.get_active_game_for_player(player=player)

        assert active_game is None
