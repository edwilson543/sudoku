# Third party imports
import pytest

# Local application imports
from domain.sudoku import solve
from tests import factories


class TestSolveSudoku:
    def test_gets_solution_for_trivial_sudoku(self):
        sudoku = [[None]]

        solution = solve.solve_sudoku(sudoku, validate_unique=True)

        assert solution == [[1]]

    def test_gets_solution_for_rank_two_sudoku(self):
        sudoku = [
            [None, 2, None, 4],
            [4, 3, 2, 1],
            [3, 4, 1, 2],
            [None, 1, 4, None],
        ]

        solution = solve.solve_sudoku(sudoku, validate_unique=True)

        assert solution == [
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [3, 4, 1, 2],
            [2, 1, 4, 3],
        ]

    def test_gets_solution_for_rank_three_sudoku(self):
        sudoku = factories.sudoku_problem()

        solution = solve.solve_sudoku(sudoku, validate_unique=True)

        assert solution == factories.sudoku_solution()

    def test_raises_for_impossible_sudoku(self):
        impossible_sudoku = [
            [1, 2, None, 3],
            [4, 3, 2, 1],
            [3, 4, 1, 2],
            [2, 1, 4, None],
        ]

        with pytest.raises(solve.SudokuSolutionNotFound):
            solve.solve_sudoku(impossible_sudoku)

    def test_raises_for_non_unique_rank_two_sudoku(self):
        sudoku = [
            [None, None, None, None],
            [None, None, None, None],
            [None, None, None, None],
            [None, None, None, None],
        ]

        # Ensure solvable
        solve.solve_sudoku(sudoku, validate_unique=False)

        with pytest.raises(solve.SudokuSolutionIsNotUnique):
            solve.solve_sudoku(sudoku, validate_unique=True)

    def test_raises_for_non_unique_rank_three_sudoku(self):
        sudoku = [
            [None, 8, None, None, None, 9, 7, 4, 3],
            [None, 5, None, None, None, 8, None, 1, None],
            [None, 1, None, None, None, None, None, None, None],
            [8, None, None, None, None, 5, None, None, None],
            [None, None, None, 8, None, 4, None, None, None],
            [None, None, None, 3, None, None, None, None, 6],
            [None, None, None, None, None, None, None, 7, None],
            [None, 3, None, 5, None, None, None, 8, None],
            [9, 7, 2, 4, None, None, None, 5, None],
        ]

        # Ensure solvable
        solve.solve_sudoku(sudoku, validate_unique=False)

        with pytest.raises(solve.SudokuSolutionIsNotUnique):
            solve.solve_sudoku(sudoku, validate_unique=True)
