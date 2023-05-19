# Standard library imports
import copy
import math
import time
from typing import Generator

# Third party imports
import pulp as lp


class DecisionVariable:
    def __init__(
        self, sudoku_rank: int, row: int, column: int, value_if_chosen: int
    ) -> None:
        self.sudoku_rank = sudoku_rank

        self.value_if_chosen = value_if_chosen

        self.row = row
        self.column = column

        # Tiles are:
        # 0 | 1 | 2
        # 3 | 4 | 5
        # 6 | 7 | 8
        self.tile = (row // sudoku_rank) * sudoku_rank + (column // sudoku_rank)

        self.lp_variable = lp.LpVariable(
            cat=lp.const.LpBinary, name=f"row-{row}-col-{column}-val-{value_if_chosen}"
        )

    def __repr__(self) -> str:
        return f"row-{self.row}-col-{self.column}-val-{self.value_if_chosen}"


class SudokuSolver:
    """
    Solve a sudoku using linear programming.
    """

    def __init__(self, sudoku: list[list[int | None]]) -> None:
        self.sudoku = sudoku
        self.size = len(sudoku)
        self.sudoku_rank = int(math.sqrt(self.size))

    def get_solution(self, validate_unique: bool = True) -> list[list[int]]:
        variables = self.create_variables()
        model = lp.LpProblem("Sudoku")
        for constraint in self.yield_component_constraints(variables):
            model += constraint
        for constraint in self.yield_cell_constraints(variables):
            model += constraint
        model.solve(lp.PULP_CBC_CMD(msg=0))

        solution = self.extract_solution_from_solved_variables(variables)
        if validate_unique:
            self._raise_if_solution_is_not_unique(model, variables)

        return solution

    @staticmethod
    def _raise_if_solution_is_not_unique(
        model: lp.LpProblem, variables: list[DecisionVariable]
    ) -> None:
        original_solution_variables = [
            variable.lp_variable
            for variable in variables
            if variable.lp_variable.varValue
        ]
        uniqueness_constraint = (
            lp.lpSum(original_solution_variables)
            <= len(original_solution_variables) - 1
        )
        model += uniqueness_constraint, "different-solution-required"
        model.resolve()
        if model.status != lp.const.LpSolutionOptimal:
            print("Unique")
        else:
            print("Not unique")

    def extract_solution_from_solved_variables(
        self, variables: list[DecisionVariable]
    ) -> list[list[int]]:
        solution = copy.deepcopy(self.sudoku)
        for variable in variables:
            if variable.lp_variable.varValue:
                solution[variable.row][variable.column] = variable.value_if_chosen
        assert not any(None in row for row in solution), "No solution found"
        return solution

    def create_variables(self) -> list[DecisionVariable]:
        variables = []
        for row in range(0, self.size):
            sudoku_row = self.sudoku[row]
            for column in range(0, self.size):
                if self.sudoku[row][column]:
                    continue
                sudoku_column = [row_[column] for row_ in self.sudoku]
                tile = self.get_tile_as_list(row, column)
                for value_if_chosen in range(1, self.size + 1):
                    if value_if_chosen in sudoku_row:
                        continue
                    if value_if_chosen in sudoku_column:
                        continue
                    if value_if_chosen in tile:
                        continue
                    variable = DecisionVariable(
                        sudoku_rank=self.sudoku_rank,
                        row=row,
                        column=column,
                        value_if_chosen=value_if_chosen,
                    )
                    variables.append(variable)

        return variables

    def yield_component_constraints(
        self, variables: list[DecisionVariable]
    ) -> Generator[lp.LpConstraint, None, None]:
        components = ["row", "column", "tile"]
        for component_type in components:
            for component in range(0, self.size):
                for value in range(1, self.size + 1):
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

    def yield_cell_constraints(
        self, variables: list[DecisionVariable]
    ) -> Generator[lp.LpConstraint, None, None]:
        for row in range(0, self.size):
            for column in range(0, self.size):
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

    def get_tile_as_list(self, row: int, column: int) -> list[int]:
        return [
            self.sudoku[row_][column_]
            for row_ in range(0, self.size)
            if row_ // self.sudoku_rank == row // self.sudoku_rank
            for column_ in range(0, self.size)
            if column // self.sudoku_rank == column_ // self.sudoku_rank
        ]


# TODO -> convert to tests

not_unique = [
    [None, None, None, None],
    [None, None, None, None],
    [None, None, None, None],
    [None, None, None, None],
]
small = [
    [None, 2, 3, 4],
    [4, 3, 2, 1],
    [3, 4, 1, 2],
    [2, 1, 4, None],
]
medium = [
    [9, None, None, 5, None, None, None, None, None],
    [6, 8, 7, 3, 4, None, None, 5, None],
    [None, None, 4, 1, None, 7, None, 3, None],
    [None, 4, None, None, 2, 6, None, None, 8],
    [None, 2, 6, None, 5, 1, 4, 9, None],
    [None, 9, 1, 4, None, 3, None, 6, 2],
    [None, None, 2, 7, None, None, 9, None, 5],
    [None, None, None, None, None, None, 3, None, 1],
    [5, None, None, None, None, 9, 6, None, 7],
]
triv = [[None]]


def time_(problem: list[list[int]]) -> None:
    print("\n#####")
    start = time.perf_counter()
    s = SudokuSolver(problem)
    s.get_solution()
    stop = time.perf_counter()
    print(format(stop - start, ".3f"), " seconds")
    print("#####")


time_(triv)
time_(not_unique)
time_(small)
time_(medium)
