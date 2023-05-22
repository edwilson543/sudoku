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

        # Create an inactive game for this player
        other_player = factories.Player()
        factories.Game(
            player=other_player, status=constants.GameStatus.INCOMPLETE_DISCARDED
        )

        # Create an active game for some other player
        other_player = factories.Player()
        factories.Game(player=other_player, status=constants.GameStatus.ACTIVE)

        active_game = queries.get_active_game_for_player(player=player)

        assert active_game is None


@pytest.mark.django_db
class TestGetNonErasedMove:
    def test_returns_move_when_there_a_non_erased_move_in_cell(self):
        player = factories.Player()
        game = factories.Game(player=player)
        move = factories.Move(game=game)

        # Create an erased move in the same cell
        factories.Move(game=game, row=move.row, column=move.column, is_erased=True)
        # Create a non-erased move in a different cell
        factories.Move(game=game, row=move.row + 1, column=move.column, is_erased=False)

        non_erased_move = queries.get_non_erased_move(
            game, row=move.row, column=move.column
        )

        assert non_erased_move == move

    def test_returns_none_when_there_is_no_non_erased_move_in_cell(self):
        player = factories.Player()
        game = factories.Game(player=player)

        # Create an erased move in the same cell
        factories.Move(game=game, row=0, column=0, is_erased=True)
        # Create a non-erased move in a different cell
        factories.Move(game=game, row=1, column=1, is_erased=False)

        non_erased_move = queries.get_non_erased_move(game, row=0, column=0)

        assert non_erased_move is None
