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
from interfaces.rest_api.views import _decorators as decorators


@decorators.frontend_only
class MakeMove(views.APIView):
    """
    Record a new move in a game of sudoku.
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
        serializer = serializers.Move(data=request.data)
        if serializer.is_valid():
            game.make_move(
                game=self.game,
                row=serializer.validated_data["row"],
                column=serializer.validated_data["column"],
                value=serializer.validated_data["value"],
            )
            return drf_response.Response(
                serializer.data, status=drf_status.HTTP_201_CREATED
            )

        return drf_response.Response(
            serializer.errors, status=drf_status.HTTP_400_BAD_REQUEST
        )
