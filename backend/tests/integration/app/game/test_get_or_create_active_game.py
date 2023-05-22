# Third party imports
import pytest

# Local application imports
from app import game
from data import constants, models
from tests import factories


@pytest.mark.django_db
class TestGetOrCreateActiveGame:
    def test_registers_new_player_and_makes_them_a_game(self):
        ip_address = "not-registered"
        sudoku = factories.Sudoku()

        active_game = game.get_or_create_active_game(
            ip_address=ip_address, difficulty=sudoku.difficulty, size=sudoku.size
        )

        player = models.Player.objects.get()
        assert player.ip_address == ip_address

        assert active_game.player == player
        assert active_game.sudoku == sudoku

    def test_gets_active_game_for_existing_player(self):
        player = factories.Player()
        existing_game = factories.Game(
            player=player, status=constants.GameStatus.ACTIVE
        )

        active_game = game.get_or_create_active_game(ip_address=player.ip_address)

        assert active_game == existing_game
