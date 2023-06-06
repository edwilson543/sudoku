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
class TestGetBoardState:
    @pytest.mark.parametrize("value", [1, None])
    def test_gets_board_with_active_move(self, value: int | None):
        problem = [[None]]
        sudoku = factories.Sudoku(problem=problem)
        game = factories.Game(sudoku=sudoku)
        # Make a move in the only empty cell
        factories.Move(game=game, row=0, column=0, value=value)

        board_state = queries.get_board_state(game=game)

        assert board_state == [[value]]

    def test_gets_board_with_erased_move(self):
        problem = [[None]]
        sudoku = factories.Sudoku(problem=problem)
        game = factories.Game(sudoku=sudoku)
        # Make a move in the only empty cell, then erase it
        factories.Move(game=game, row=0, column=0, value=1, number_in_game=1)
        factories.Move(game=game, row=0, column=0, value=None, number_in_game=2)

        board_state = queries.get_board_state(game=game)

        assert board_state == [[None]]

    def test_gets_board_with_corrected_move(self):
        problem = [[None]]
        sudoku = factories.Sudoku(problem=problem)
        game = factories.Game(sudoku=sudoku)
        # Make a move in the only empty cell, then erase it, then overwrite it
        factories.Move(game=game, row=0, column=0, value=1, number_in_game=1)
        factories.Move(game=game, row=0, column=0, value=2, number_in_game=2)

        board_state = queries.get_board_state(game=game)

        assert board_state == [[2]]

    def test_ignores_undone_move(self):
        problem = [[None]]
        sudoku = factories.Sudoku(problem=problem)
        game = factories.Game(sudoku=sudoku)
        # Make a move in the only empty cell, then erase it, then overwrite it
        factories.Move(
            game=game, row=0, column=0, value=2, is_undone=False, number_in_game=1
        )
        factories.Move(
            game=game, row=0, column=0, value=1, is_undone=True, number_in_game=2
        )

        board_state = queries.get_board_state(game=game)

        assert board_state == [[2]]
