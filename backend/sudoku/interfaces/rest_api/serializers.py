# Standard library imports
from collections import OrderedDict

# Third party imports
from rest_framework import serializers

# Local application imports
from data import constants, models


class Sudoku(serializers.Serializer):
    """
    Serializer for a sudoku definition.
    """

    problem = serializers.JSONField(read_only=True)
    solution = serializers.JSONField(read_only=True)
    difficulty = serializers.ChoiceField(choices=constants.SudokuDifficulty.choices)
    size = serializers.IntegerField()
    number_of_missing_values = serializers.IntegerField(read_only=True)


class Move(serializers.Serializer):
    """
    Serializer for an existing move in a game of sudoku.
    """

    id = serializers.IntegerField(read_only=True)
    row = serializers.IntegerField()
    column = serializers.IntegerField()
    value = serializers.IntegerField()
    is_correct = serializers.IntegerField(read_only=True)
    is_erased = serializers.IntegerField(read_only=True)


class Game(serializers.Serializer):
    """
    Serializer for a game of sudoku, including historic moves.
    """

    sudoku = serializers.SerializerMethodField()
    moves = serializers.SerializerMethodField()
    started_at = serializers.DateTimeField(format="YYYY-MM-DDTHH:MM:SS")

    def get_sudoku(self, game: models.Game) -> list[OrderedDict]:
        return Sudoku(instance=game.sudoku).data

    def get_moves(self, game: models.Game) -> list[OrderedDict]:
        return Sudoku(instance=game.moves.all(), many=True).data
