# Third party imports
from rest_framework import status as drf_status

# Django imports
from django import urls as django_urls

# Local application imports
from tests import factories


class TestEraseAllIncorrectMoves:
    def test_erases_all_incorrect_moves_for_game(self, rest_api_client):
        # Create a sudoku game, with some moves
        game = factories.Game()
        incorrect_move = factories.Move(game=game, is_erased=False, is_correct=False)
        other_incorrect_move = factories.Move(
            game=game, is_erased=False, is_correct=False
        )
        correct_move = factories.Move(game=game, is_erased=False, is_correct=True)

        # Send the move to the move endpoint
        endpoint = django_urls.reverse(
            "erase-all-incorrect-moves", kwargs={"game_id": game.id}
        )
        response = rest_api_client.post(endpoint)

        # Check the response
        assert response.status_code == drf_status.HTTP_200_OK
        serialized_moves = response.data["moves"]
        assert sum(1 for move in serialized_moves if move["is_correct"]) == 1

        # Check the incorrect move was erased in the db
        incorrect_move.refresh_from_db()
        other_incorrect_move.refresh_from_db()
        correct_move.refresh_from_db()
        assert incorrect_move.is_erased
        assert other_incorrect_move.is_erased
        assert not correct_move.is_erased
