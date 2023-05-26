# Third party imports
import pytest

# Local application imports
from app import game
from data import constants, models
from tests import factories


@pytest.mark.django_db
class TestCreateNextGame:
    def test_creates_next_game_and_terminates_active_game(self):
        player = factories.Player()
        previous_game = factories.Game(
            player=player, status=constants.GameStatus.ACTIVE
        )
        unattempted_sudoku = factories.Sudoku()

        new_game = game.create_next_game(
            ip_address=player.ip_address,
            difficulty=unattempted_sudoku.difficulty,
            size=unattempted_sudoku.size,
        )

        # Check the new game is as expected
        assert new_game.player == player
        assert new_game.sudoku == unattempted_sudoku

        # Check the previous game was terminated
        previous_game.refresh_from_db()
        assert previous_game.status != constants.GameStatus.ACTIVE

    def test_raises_when_player_does_not_exist(self):
        with pytest.raises(models.Player.DoesNotExist):
            game.create_next_game(
                ip_address="no-corresponding-player",
                difficulty=constants.SudokuDifficulty.EASY,
                size=constants.SudokuSize.FOUR,
            )

    def test_raises_when_player_has_no_activ_game(self):
        player = factories.Player()

        with pytest.raises(game.PlayerHasNoActiveGame):
            game.create_next_game(
                ip_address=player.ip_address,
                difficulty=constants.SudokuDifficulty.EASY,
                size=constants.SudokuSize.FOUR,
            )
