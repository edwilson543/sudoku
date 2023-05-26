# Third party imports
from rest_framework import request as drf_request
from rest_framework import response as drf_response
from rest_framework import status as drf_status
from rest_framework import views

# Local application imports
from app import game
from interfaces.rest_api import serializers
from interfaces.rest_api.views import _decorators as decorators


@decorators.frontend_only
class CreateNextGame(views.APIView):
    """
    Create a new game with a fresh sudoku for the player at the given IP address.
    """

    def post(
        self, request: drf_request, *args: object, **kwargs: object
    ) -> drf_response.Response:
        next_game_data = serializers.GameInitiation(data=request.data)

        if next_game_data.is_valid():
            try:
                next_game = game.create_next_game(
                    ip_address=next_game_data.validated_data["ip_address"],
                    size=next_game_data.validated_data["size"],
                    difficulty=next_game_data.validated_data["difficulty"],
                )
            except game.UnableToCreateSudoku:
                return drf_response.Response(
                    request.data, status=drf_status.HTTP_504_GATEWAY_TIMEOUT
                )
            serialized_game = serializers.Game(instance=next_game)
            return drf_response.Response(
                serialized_game.data, status=drf_status.HTTP_200_OK
            )

        return drf_response.Response(
            next_game_data.errors, status=drf_status.HTTP_400_BAD_REQUEST
        )
