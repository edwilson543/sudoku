# Standard library imports
import copy
import dataclasses
import functools
import math
from typing import Generator, cast

# Third party imports
import pulp as lp


class SudokuSolutionNotFound(Exception):
    pass


class SudokuSolutionIsNotUnique(Exception):
    pass


def solve_sudoku(
    sudoku: list[list[int | None]], validate_unique: bool = True
) -> list[list[int]]:
    """
    Get the solution to some sudoku.

    :param sudoku: A list of lists of clues / empty cells, where each sublist
        is a row of the problem
    :param validate_unique: Whether to raise if the solution does not have a
        unique solution

    :raises SudokuSolutionIsNotUnique: When `sudoku` does not have a unique
    solution and `validate_unique` is set to True.
    :raises SudokuSolutionNotFound: When no or an incomplete solution was found.
    """
    problem = _SudokuProblem(sudoku)
    variables = _create_variables(problem)
    model = lp.LpProblem("Sudoku")
    for constraint in _yield_component_constraints(problem, variables):
        model += constraint
    for constraint in _yield_cell_constraints(problem, variables):
        model += constraint
    model.solve(lp.PULP_CBC_CMD(msg=False))

    solution = _extract_solution_from_solved_variables(problem, variables)
    if validate_unique:
        _raise_if_solution_is_not_unique(model, variables)

    return solution


@dataclasses.dataclass(frozen=True)
class _SudokuProblem:
    """
    Represent of an unsolved sudoku problem, and provide a few helpers.
    """

    problem: list[list[int | None]]

    def get_tile_as_list(self, row: int, column: int) -> list[int | None]:
        """
        Extract a tile of the sudoku problem into a list of integers.
        """
        return [
            self.problem[row_][column_]
            for row_ in range(0, self.size)
            if row_ // self.sudoku_rank == row // self.sudoku_rank
            for column_ in range(0, self.size)
            if column // self.sudoku_rank == column_ // self.sudoku_rank
        ]

    @functools.cached_property
    def size(self) -> int:
        return len(self.problem)

    @functools.cached_property
    def sudoku_rank(self) -> int:
        return int(math.sqrt(self.size))


class _DecisionVariable:
    """
    A single binary variable that decides whether an empty cell gets a specific value.
    """

    def __init__(
        self, sudoku_rank: int, row: int, column: int, value_if_chosen: int
    ) -> None:
        self.sudoku_rank = sudoku_rank
        self.value_if_chosen = value_if_chosen
        self.row = row
        self.column = column

        self.lp_variable = lp.LpVariable(
            cat=lp.const.LpBinary, name=f"row-{row}-col-{column}-val-{value_if_chosen}"
        )

    def __repr__(self) -> str:
        return f"row-{self.row}-col-{self.column}-val-{self.value_if_chosen}"

    @property
    def tile(self) -> int:
        """
        Derive the tile this variable's cell is in.

        Tiles are enumerated for example as:
        0 | 1 | 2
        3 | 4 | 5
        6 | 7 | 8
        """
        return (self.row // self.sudoku_rank) * self.sudoku_rank + (
            self.column // self.sudoku_rank
        )


# ----------
# Linear programming logic
# ----------


def _create_variables(problem: _SudokuProblem) -> list[_DecisionVariable]:
    """
    Create a decision variable for each feasible value and empty cell combination.

    By "feasible" we naively mean there is not already a clue with the
    same value in the row, column or tile. This significantly reduces the
    complexity of the LP.
    """
    variables = []
    for row in range(0, problem.size):
        sudoku_row = problem.problem[row]
        for column in range(0, problem.size):
            if problem.problem[row][column]:
                # This cell is a clue, so the decision is already made
                continue
            sudoku_column = [row_[column] for row_ in problem.problem]
            tile = problem.get_tile_as_list(row, column)
            for value_if_chosen in range(1, problem.size + 1):
                if value_if_chosen in sudoku_row:
                    continue
                if value_if_chosen in sudoku_column:
                    continue
                if value_if_chosen in tile:
                    continue

                # `value_if_chosen` isn't in the row, column, or tile, so make a variable
                variable = _DecisionVariable(
                    sudoku_rank=problem.sudoku_rank,
                    row=row,
                    column=column,
                    value_if_chosen=value_if_chosen,
                )
                variables.append(variable)

    return variables


def _yield_component_constraints(
    problem: _SudokuProblem, variables: list[_DecisionVariable]
) -> Generator[lp.LpConstraint, None, None]:
    """
    Ensure each row, column and tile gets exactly one of each required value.

    Essentially, the sum of the decision variables over each `value_if_chosen`
    in each row, column and tile must equal 1.
    """
    component_types = ["row", "column", "tile"]
    for component_type in component_types:
        for component in range(0, problem.size):
            # Component now represents the nth row, column or tile
            for value in range(1, problem.size + 1):
                component_variables = [
                    variable.lp_variable
                    for variable in variables
                    if getattr(variable, component_type) == component
                    and variable.value_if_chosen == value
                ]
                if not component_variables:
                    continue
                yield lp.lpSum(
                    component_variables
                ) == 1, f"{component_type}-{component}-needs-{value}"


def _yield_cell_constraints(
    problem: _SudokuProblem, variables: list[_DecisionVariable]
) -> Generator[lp.LpConstraint, None, None]:
    """
    Ensure each cell gets assigned exactly one value.
    """
    for row in range(0, problem.size):
        for column in range(0, problem.size):
            cell_variables = [
                variable.lp_variable
                for variable in variables
                if variable.row == row and variable.column == column
            ]
            if not cell_variables:
                continue
            yield lp.lpSum(
                cell_variables
            ) == 1, f"row-{row}-column-{column}-needs-a-value"


def _extract_solution_from_solved_variables(
    problem: _SudokuProblem, variables: list[_DecisionVariable]
) -> list[list[int]]:
    """
    Extract the solution from the variables as a list of solved rows.

    :raises SudokuSolutionNotFound: When no or an incomplete solution was found.
    """
    solution = copy.deepcopy(problem.problem)
    for variable in variables:
        if variable.lp_variable.varValue:
            solution[variable.row][variable.column] = variable.value_if_chosen
    if any(None in row for row in solution):
        raise SudokuSolutionNotFound
    return cast(list[list[int]], solution)


def _raise_if_solution_is_not_unique(
    model: lp.LpProblem, variables: list[_DecisionVariable]
) -> None:
    """
    Raise an error if we can find a different solution to the sudoku.
    """
    # Get the variables decided to be non-zero in the original solution
    original_solution_variables = [
        variable.lp_variable for variable in variables if variable.lp_variable.varValue
    ]
    # Disallow these variables from all being non-zero in a new solution
    unique_solution_constraint = (
        lp.lpSum(original_solution_variables) <= len(original_solution_variables) - 1
    )
    model += unique_solution_constraint, "unique-solution-constraint"
    model.resolve()

    if model.status != lp.const.LpSolutionOptimal:
        # No alternative solution could be found, so the original solution was unique
        return None

    # An alternative solution was found
    raise SudokuSolutionIsNotUnique
