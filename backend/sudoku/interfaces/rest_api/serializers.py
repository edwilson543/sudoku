# Third party imports
from rest_framework import serializers


class Move(serializers.Serializer):
    """
    Serializer for a move in a game of sudoku.
    """

    id = serializers.IntegerField(required=False)
    row = serializers.IntegerField()
    column = serializers.IntegerField()
    value = serializers.IntegerField()
    is_correct = serializers.IntegerField(required=False)
    is_erased = serializers.IntegerField(required=False)
