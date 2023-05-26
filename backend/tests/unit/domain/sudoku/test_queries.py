# Third party imports
import pytest

# Local application imports
from data import constants
from domain.sudoku import queries
from tests import factories


@pytest.mark.django_db
class TestGetUnattemptedSudokusForPlayer:
    def test_gets_unattempted_sudokus_when_at_least_one_exists(self):
        player = factories.Player()

        sudoku = factories.Sudoku()
        another_sudoku = factories.Sudoku()

        sudokus = queries.get_unattempted_sudokus_for_player(
            player=player, size=sudoku.size, difficulty=sudoku.difficulty
        )

        # The sudokus should be ordered by when they were created
        assert sudokus.first() == sudoku
        assert sudokus.count() == 2
        assert another_sudoku in sudokus

    def test_returns_empty_queryset_when_player_has_attempted_all_sudokus(self):
        player = factories.Player()

        sudoku = factories.Sudoku()
        factories.Game(player=player, sudoku=sudoku)

        sudokus = queries.get_unattempted_sudokus_for_player(
            player=player, size=sudoku.size, difficulty=sudoku.difficulty
        )

        assert not sudokus.exists()

    def test_returns_empty_queryset_when_no_sudokus_available(self):
        player = factories.Player()

        factories.Sudoku(
            size=constants.SudokuSize.FOUR, difficulty=constants.SudokuDifficulty.EASY
        )
        factories.Sudoku(
            size=constants.SudokuSize.NINE, difficulty=constants.SudokuDifficulty.MEDIUM
        )

        sudokus = queries.get_unattempted_sudokus_for_player(
            player=player,
            size=constants.SudokuSize.FOUR,
            difficulty=constants.SudokuDifficulty.MEDIUM,
        )

        assert not sudokus.exists()
