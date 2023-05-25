# Third party imports
from rest_framework import status as drf_status

# Django imports
from django import urls as django_urls

# Local application imports
from data import constants, models
from interfaces.rest_api import serializers
from tests import factories


class TestActiveGame:
    def test_gets_active_game_for_player(self, rest_api_client):
        # Create an existing player with an existing game
        player = factories.Player(ip_address="192.0.2.1")
        game = factories.Game(player=player, status=constants.GameStatus.ACTIVE)

        # Create a payload containing a valid move in this game
        payload = {"ip_address": player.ip_address}

        # Get the active game for this player via the api
        endpoint = django_urls.reverse("active-game")
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response contains the serialized game
        assert response.status_code == drf_status.HTTP_200_OK
        assert response.data == serializers.Game(instance=game).data

    def test_creates_game_for_new_player(self, rest_api_client):
        ip_address = "192.0.2.1"

        # Create a payload containing a valid move in this game
        sudoku = factories.Sudoku()
        payload = {
            "ip_address": ip_address,
            "difficulty": sudoku.difficulty,
            "size": sudoku.size,
        }

        # Get the active game for this player via the api
        endpoint = django_urls.reverse("active-game")
        response = rest_api_client.post(endpoint, data=payload)

        # Check the response contains a serialized game
        assert response.status_code == drf_status.HTTP_200_OK
        assert response.data["sudoku"]
        assert response.data["moves"] == []

        # Check the relevant db content was created
        player = models.Player.objects.get(ip_address=ip_address)
        game = models.Game.objects.get()
        assert game.player == player
        assert game.sudoku == sudoku

    def test_bad_request_if_ip_address_not_in_the_payload(self, rest_api_client):
        payload = {}

        endpoint = django_urls.reverse("active-game")
        response = rest_api_client.post(endpoint, data=payload)

        assert response.status_code == drf_status.HTTP_400_BAD_REQUEST
