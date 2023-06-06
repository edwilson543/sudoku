# Third party imports
from rest_framework import status as drf_status

# Django imports
from django import urls as django_urls

# Local application imports
from tests import factories


class TestUndoMove:
    def test_erases_last_move(self, rest_api_client):
        # Create a sudoku game, with some moves
        game = factories.Game()
        move = factories.Move(game=game, is_undone=False)

        # Send the move to the move endpoint
        endpoint = django_urls.reverse(
            "undo-move",
            kwargs={"game_id": game.id, "number_in_game": move.number_in_game},
        )
        response = rest_api_client.post(endpoint)

        # Check the response
        assert response.status_code == drf_status.HTTP_200_OK

        # Check the correct move was erased
        move.refresh_from_db()
        assert move.is_undone

    def test_raises_bad_request_when_game_has_no_moves(self, rest_api_client):
        # Create a sudoku game, without any moves
        game = factories.Game()

        # Send the move to the move endpoint
        endpoint = django_urls.reverse(
            "undo-move",
            kwargs={"game_id": game.id, "number_in_game": 1},
        )
        response = rest_api_client.post(endpoint)

        # Check the response
        assert response.status_code == drf_status.HTTP_404_NOT_FOUND
