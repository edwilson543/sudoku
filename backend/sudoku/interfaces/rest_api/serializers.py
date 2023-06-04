# Standard library imports
from collections import OrderedDict

# Third party imports
from rest_framework import serializers

# Local application imports
from data import constants, models


class GameInitiation(serializers.Serializer):
    """
    Serialize the information required to initiate a game.
    """

    ip_address = serializers.IPAddressField()
    difficulty = serializers.ChoiceField(
        choices=constants.SudokuDifficulty.choices,
        default=constants.SudokuDifficulty.MEDIUM,
    )
    size = serializers.ChoiceField(
        choices=constants.SudokuSize.choices, default=constants.SudokuSize.NINE
    )


class Sudoku(serializers.Serializer):
    """
    Serializer for a sudoku definition.
    """

    problem = serializers.JSONField()
    solution = serializers.JSONField()
    difficulty = serializers.ChoiceField(choices=constants.SudokuDifficulty.choices)
    size = serializers.ChoiceField(choices=constants.SudokuSize.choices)
    number_of_missing_values = serializers.IntegerField()


class Move(serializers.Serializer):
    """
    Serializer for an existing move in a game of sudoku.
    """

    id = serializers.IntegerField(read_only=True)
    row = serializers.IntegerField(min_value=0)
    column = serializers.IntegerField(min_value=0)
    value = serializers.IntegerField(required=False, min_value=1, allow_null=True)
    is_correct = serializers.BooleanField(read_only=True)


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
        return Move(instance=game.moves.all(), many=True).data
