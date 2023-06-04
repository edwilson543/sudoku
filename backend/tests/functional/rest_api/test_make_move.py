# Third party imports
from rest_framework import status as drf_status

# Django imports
from django import urls as django_urls

# Local application imports
from tests import factories


class TestMakeMove:
    def test_records_move(self, rest_api_client):
        # Create a sudoku game
        problem = [[None]]
        solution = [[1]]
        sudoku = factories.Sudoku(problem=problem, solution=solution)
        game = factories.Game(sudoku=sudoku)

        # Create a payload containing a valid move in this game
        payload = {"row": 0, "column": 0, "value": 1}

        # Send the move to the move endpoint
        endpoint = django_urls.reverse("make-move", kwargs={"game_id": game.id})
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response
        assert response.status_code == drf_status.HTTP_201_CREATED
        assert response.data == {"row": 0, "column": 0, "value": 1}

        # Check the relevant move was created
        move = game.moves.get()
        assert move.row == 0
        assert move.column == 0
        assert move.value == 1

    def test_raises_bad_request_for_invalid_move(self, rest_api_client):
        game = factories.Game()

        # Create a payload missing a row
        payload = {"column": 0, "value": 1}

        # Send the move to the move endpoint
        endpoint = django_urls.reverse("make-move", kwargs={"game_id": game.id})
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response
        assert response.status_code == drf_status.HTTP_400_BAD_REQUEST
