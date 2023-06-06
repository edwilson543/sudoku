# Standard library imports
from typing import Any

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
from interfaces.rest_api.views import _decorators as decorators


@decorators.frontend_only
class UndoMove(views.APIView):
    """
    Erase a single move from a game.
    """

    # Instance vars
    game: models.Game
    number_in_game: int

    def setup(self, request: drf_request.Request, *args: object, **kwargs: Any) -> None:
        super().setup(request, *args, **kwargs)
        self.game = shortcuts.get_object_or_404(klass=models.Game, id=kwargs["game_id"])
        self.number_in_game = kwargs["number_in_game"]

    def post(
        self, request: drf_request.Request, *args: object, **kwargs: object
    ) -> drf_response.Response:
        status = drf_status.HTTP_200_OK
        try:
            game.undo_move(game=self.game, number_in_game=self.number_in_game)
        except game.MoveDoesNotExist:
            status = drf_status.HTTP_404_NOT_FOUND

        return drf_response.Response(status=status)
