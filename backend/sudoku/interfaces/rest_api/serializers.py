# Third party imports
from rest_framework import serializers

# Local application imports
from data import constants


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
