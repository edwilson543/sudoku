# Third party imports
from rest_framework import request as drf_request
from rest_framework import response as drf_response
from rest_framework import status as drf_status
from rest_framework import views

# Django imports
from django import shortcuts

# Local application imports
from app import game
from data import models
from interfaces.rest_api import serializers


class EraseAllIncorrectMoves(views.APIView):
    """
    Find and erase all incorrect moves from a game.
    """

    # Instance vars
    game: models.Game

    def setup(
        self, request: drf_request.Request, *args: object, **kwargs: object
    ) -> None:
        super().setup(request, *args, **kwargs)
        self.game = shortcuts.get_object_or_404(klass=models.Game, id=kwargs["game_id"])

    def post(
        self, request: drf_request.Request, *args: object, **kwargs: object
    ) -> drf_response.Response:
        game.erase_all_incorrect_moves(
            game=self.game,
        )
        updated_game = serializers.Game(instance=self.game)

        return drf_response.Response(
            data=updated_game.data, status=drf_status.HTTP_200_OK
        )
