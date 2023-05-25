# Standard library imports
from collections import OrderedDict

# Third party imports
import pytest

# Local application imports
from data import constants, models
from interfaces.rest_api import serializers
from tests import factories


@pytest.mark.django_db
class TestGameInitiation:
    def test_deserializes_and_validates_ip_address(self):
        data = {"ip_address": "192.0.2.1"}
        defaults = {"difficulty": "MEDIUM", "size": 9}

        serializer = serializers.GameInitiation(data=data)

        assert serializer.is_valid()
        assert serializer.validated_data == data | defaults

    def test_deserializes_and_validates_new_sudoku_payload(self):
        data = {"ip_address": "192.0.2.1", "difficulty": "MEDIUM", "size": 9}

        serializer = serializers.GameInitiation(data=data)

        serializer.is_valid()

        assert serializer.validated_data == data

    def test_validation_fails_for_invalid_ip_address(self):
        data = {"ip_address": "ed@gmail.com"}

        serializer = serializers.GameInitiation(data=data)

        assert not serializer.is_valid()
        assert (
            str(serializer.errors["ip_address"][0])
            == "Enter a valid IPv4 or IPv6 address."
        )


@pytest.mark.django_db
class TestSudoku:
    def test_serializes_sudoku(self):
        problem = [[None, 2, None, 4], [4, 3, 2, 1], [3, 4, 1, 2], [None, 1, 4, None]]
        solution = [
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [3, 4, 1, 2],
            [2, 1, 4, 3],
        ]

        sudoku = factories.Sudoku(
            problem=problem,
            solution=solution,
            difficulty=constants.SudokuDifficulty.EASY,
            size=4,
            number_of_missing_values=4,
        )

        serialized_sudoku = serializers.Sudoku(instance=sudoku).data

        assert serialized_sudoku == OrderedDict(
            [
                ("problem", problem),
                ("solution", solution),
                ("difficulty", "EASY"),
                ("size", 4),
                ("number_of_missing_values", 4),
            ]
        )


@pytest.mark.django_db
class TestMove:
    def test_serializes_queryset_of_moves(self):
        move_a = factories.Move()
        move_b = factories.Move()
        moves = models.Move.objects.order_by("made_at")

        serialized_moves = serializers.Move(instance=moves, many=True).data

        assert serialized_moves == [
            OrderedDict(
                [
                    ("id", move_a.id),
                    ("row", move_a.row),
                    ("column", move_a.column),
                    ("value", move_a.value),
                    ("is_correct", move_a.is_correct),
                    ("is_erased", move_a.is_erased),
                ]
            ),
            OrderedDict(
                [
                    ("id", move_b.id),
                    ("row", move_b.row),
                    ("column", move_b.column),
                    ("value", move_b.value),
                    ("is_correct", move_b.is_correct),
                    ("is_erased", move_b.is_erased),
                ]
            ),
        ]

    def test_deserializes_and_validates_move_defined_by_position(self):
        data = {"row": 4, "column": 6, "value": 7}

        serializer = serializers.Move(data=data)

        assert serializer.is_valid()

        assert serializer.validated_data == data

    def test_validation_fails_when_move_value_is_missing(self):
        data = {"row": 4, "column": 6, "value": None}

        serializer = serializers.Move(data=data)

        assert not serializer.is_valid()
        assert str(serializer.errors["value"][0]) == "This field may not be null."


@pytest.mark.django_db
class TestGame:
    def test_serializes_game_with_no_moves(self):
        game = factories.Game()

        serialized_game = serializers.Game(instance=game).data

        assert serialized_game == OrderedDict(
            # Sudoku serializer directly above
            [
                ("sudoku", serializers.Sudoku(instance=game.sudoku).data),
                ("moves", []),
                ("started_at", game.started_at.strftime("YYYY-MM-DDTHH:MM:SS")),
            ]
        )
