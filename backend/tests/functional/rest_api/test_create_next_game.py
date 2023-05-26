# Third party imports
from rest_framework import status as drf_status

# Django imports
from django import urls as django_urls

# Local application imports
from data import constants, models
from interfaces.rest_api import serializers
from tests import factories


class TestCreateNextGame:
    def test_creates_new_game_for_player(self, rest_api_client):
        # Create an existing player with an existing game
        player = factories.Player(ip_address="192.0.2.1")
        current_game = factories.Game(player=player, status=constants.GameStatus.ACTIVE)
        sudoku = factories.Sudoku()

        # Create a payload containing a valid move in this game
        payload = {"ip_address": player.ip_address}

        # Ask for a new game for this player via the API
        endpoint = django_urls.reverse("next-game")
        response = rest_api_client.post(endpoint, data=payload)

        # Check a new game was created
        current_game.refresh_from_db()
        assert current_game.status != constants.GameStatus.ACTIVE
        new_game = models.Game.objects.exclude(id=current_game.id).get()
        assert new_game.status == constants.GameStatus.ACTIVE
        assert new_game.sudoku == sudoku
        assert new_game.player == player

        # Check the response contains the serialized game
        assert response.status_code == drf_status.HTTP_200_OK
        assert response.data == serializers.Game(instance=new_game).data

    def test_bad_request_if_ip_address_not_in_the_payload(self, rest_api_client):
        payload = {}

        endpoint = django_urls.reverse("next-game")
        response = rest_api_client.post(endpoint, data=payload)

        assert response.status_code == drf_status.HTTP_400_BAD_REQUEST
