# Third party imports
from rest_framework import status as drf_status

# Django imports
from django import urls as django_urls

# Local application imports
from tests import factories


class TestMakeMove:
    def test_records_correct_move(self, rest_api_client):
        # Create a sudoku game, with some moves
        game = factories.Game()
        move = factories.Move(game=game, is_erased=False)
        other_move = factories.Move(game=game, is_erased=False)

        # Create a payload specifying the move to erase
        payload = {"row": move.row, "column": move.column}

        # Send the move to the move endpoint
        endpoint = django_urls.reverse("erase-move", kwargs={"game_id": game.id})
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response
        assert response.status_code == drf_status.HTTP_200_OK

        # Check the correct move was erased
        move.refresh_from_db()
        other_move.refresh_from_db()
        assert move.is_erased
        assert not other_move.is_erased

    def test_raises_bad_request_for_non_existent_move(self, rest_api_client):
        # Create a sudoku game, without any moves
        game = factories.Game()

        # Create a payload specifying a non-existent move to erase
        payload = {"row": 0, "column": 0}

        # Send the move to the move endpoint
        endpoint = django_urls.reverse("erase-move", kwargs={"game_id": game.id})
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response
        assert response.status_code == drf_status.HTTP_400_BAD_REQUEST

    def test_raises_bad_request_for_invalid_payload(self, rest_api_client):
        # Create a sudoku game
        game = factories.Game()

        # Create a payload that doesn't specify the row of the move to erase
        payload = {"column": 0}

        # Send the move to the move endpoint
        endpoint = django_urls.reverse("erase-move", kwargs={"game_id": game.id})
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response
        assert response.status_code == drf_status.HTTP_400_BAD_REQUEST
