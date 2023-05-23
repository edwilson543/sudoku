# Standard library imports
from collections import OrderedDict

# Third party imports
import pytest

# Local application imports
from data import models
from interfaces.rest_api import serializers
from tests import factories


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

    def test_deserialization_raises_for_moving_missing_a_value(self):
        data = {"row": 4, "column": 6, "value": None}

        serializer = serializers.Move(data=data)

        assert not serializer.is_valid()

        assert str(serializer.errors["value"][0]) == "This field may not be null."
